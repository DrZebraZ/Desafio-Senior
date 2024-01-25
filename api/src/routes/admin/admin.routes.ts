import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { RequireADM } from "../middlewares/authentication";
import { $ref, getFiltered, getFilteredType } from "./admin.schema";
import { ResultValidation } from "@/utils/result-validation";
import { applyResult } from "../middlewares/applyResult";
import { prisma } from "@/db/prisma";
import { ERROR_TYPES } from "@/errors/ErrorTypes";

export async function AdminRoutes(app: FastifyInstance){
  app.get('/getFiltered', {onRequest:RequireADM.bind(app)}, 
  async (req:FastifyRequest, res:FastifyReply) => {
    const resultValidation = new ResultValidation()
    console.log(req.query)
    const query = getFiltered.parse(req.query)
    try {
      let whereClause: any = { deleted_at: null };
      if(query){
        if (query.name) {
          whereClause.name = { contains: query.name};
        }
        if (query.description) {
          whereClause.description = { contains: query.description};
        }
        if (query.status) {
          whereClause.Response = { status: query.status}
        }
      }
      console.log(whereClause)
      await prisma.request.findMany({
        where: whereClause,
        select: {
          id: true,
          name: true,
          description: true,
          price: true,
          User: {
            select: {
              id: true,
              username: true
            }
          },
          Response: {
            select: {
              id: true,
              respondent_id: true,
              status: true,
              observation: true,
              created_at: true,
              updated_at: true
            }
          },
          created_at: true,
          updated_at: true
        }
      }).then(result => 
        result != null ? resultValidation.setResult({data:result}): resultValidation.addError(ERROR_TYPES.user.CREATE_USER_ERROR.TAG, ERROR_TYPES.user.CREATE_USER_ERROR.MESSAGE)
      )
    }catch(err){
      console.log(err)
      resultValidation.addError(ERROR_TYPES.database.INSERT_ERROR.TAG, ERROR_TYPES.database.INSERT_ERROR.MESSAGE, true, err)
    }
    applyResult(resultValidation, res, 200);
  }
);
}