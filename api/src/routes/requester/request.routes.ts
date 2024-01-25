import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { Prisma } from '@/prisma/generated/client';
import { prisma } from '@/db/prisma';
import { ResultValidation } from '@/utils/result-validation';
import { $ref, createRequestBodyType } from "./request.schemas";
import { RequireRequester } from "../middlewares/authentication";
import { randomUUID } from "crypto";
import { JWTBodyType } from '../user/user.schemas';
import { ERROR_TYPES } from "@/errors/ErrorTypes";
import { applyResult } from "../middlewares/applyResult";

export async function RequestRoutes(app: FastifyInstance){
  app.post('/create', {onRequest:RequireRequester.bind(app), schema:{body:$ref('createRequestBody')}}, 
  async (req:FastifyRequest<{Body:createRequestBodyType, user:JWTBodyType}>, res:FastifyReply) => {
    const {name, description, price} = req.body;
    const resultValidation = new ResultValidation();
    const id = randomUUID()
    const data: Prisma.RequestCreateInput = {
      id,
      name,
      description,
      price,
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
      User: {
        connect: {
          id: req.user.id
        }
      },
      Response:{
        create:{
          id: randomUUID(),
          request_id:id,
          status:'awaiting',
          created_at: new Date()
        }
      }
    }
    try{
      await prisma.request.create({
        data: data
      }).then(result => 
        result != null ? resultValidation.setResult({data:"done!"}): resultValidation.addError(ERROR_TYPES.user.CREATE_USER_ERROR.TAG, ERROR_TYPES.user.CREATE_USER_ERROR.MESSAGE)
      )
    }catch(err){
      resultValidation.addError(ERROR_TYPES.database.INSERT_ERROR.TAG, ERROR_TYPES.database.INSERT_ERROR.MESSAGE, true, err)
    }
    applyResult(resultValidation, res, 201);
  });
}