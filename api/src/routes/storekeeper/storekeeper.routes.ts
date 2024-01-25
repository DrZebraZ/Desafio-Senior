import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { Prisma } from '@/prisma/generated/client';
import { prisma } from '@/db/prisma';
import { ResultValidation } from '@/utils/result-validation';
import { RequireRequester, RequireStorekeeper } from "../middlewares/authentication";
import { randomUUID } from "crypto";
import { JWTBodyType } from '../user/user.schemas';
import { ERROR_TYPES } from "@/errors/ErrorTypes";
import { applyResult } from "../middlewares/applyResult";
import { $ref, insertResponseDatabaseType, makeResponseType } from "./storekeeper.schemas";

export async function StorekeeperRoutes(app: FastifyInstance){
  app.get('/getRequests', {onRequest:RequireStorekeeper.bind(app)}, 
  async (req:FastifyRequest, res:FastifyReply) => {
    const resultValidation = new ResultValidation();
    try{
      await prisma.request.findMany({
        where:{
          Response:{
            status:'awaiting'
          }
        },
        select:{
          id:true,
          name:true,
          description:true,
          price:true,
          User:{
            select:{
              id:true,
              username:true
            }
          },
          created_at:true
        }
      }).then(result => 
        result != null ? resultValidation.setResult({data:result}): resultValidation.addError(ERROR_TYPES.user.CREATE_USER_ERROR.TAG, ERROR_TYPES.user.CREATE_USER_ERROR.MESSAGE)
      )
    }catch(err){
      resultValidation.addError(ERROR_TYPES.database.INSERT_ERROR.TAG, ERROR_TYPES.database.INSERT_ERROR.MESSAGE, true, err)
    }
    applyResult(resultValidation, res, 200);
  });

  app.patch('/updateRequest/:request_id', {onRequest:RequireStorekeeper.bind(app), schema:{body:$ref('makeResponse')}},
  async (req:FastifyRequest<{Body:makeResponseType, user:JWTBodyType, Params:{request_id:string}}>, res:FastifyReply) => {
    const resultValidation = new ResultValidation();
    if(req.body.status == 'refused'){
      if(!req.body.observation){
        resultValidation.addError("Value Error", "Need inform a observation cause REFUSED!");
        return applyResult(resultValidation, res, 400)
      }
    }
    try{
      await prisma.response.update({
        data:{
          status:req.body.status,
          observation:req.body.observation,
          updated_at: new Date(),
          respondent_id: req.user.id
        },
        where:{
          request_id: req.params.request_id
        }
      }).then(result => 
        result != null ? resultValidation.setResult({data:result}): resultValidation.addError(ERROR_TYPES.user.CREATE_USER_ERROR.TAG, ERROR_TYPES.user.CREATE_USER_ERROR.MESSAGE)
      )
    }catch(err){
      resultValidation.addError(ERROR_TYPES.database.INSERT_ERROR.TAG, ERROR_TYPES.database.INSERT_ERROR.MESSAGE, true, err)
    }
    applyResult(resultValidation, res, 200);
  })
}