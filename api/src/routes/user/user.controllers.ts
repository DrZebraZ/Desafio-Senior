import { FastifyReply, FastifyRequest } from "fastify";

import { createUserBodyType } from "./user.schemas";
import { PrismaUserRepository } from "./repository/prisma.user.repository";

import { UserAuthenticateCase } from "./use-cases/user.authenticate.case";
import { UserCreateCase } from "./use-cases/user.create.case";

import { applyResult } from '../middlewares/applyResult';
import { ResultValidation } from "@/utils/result-validation";

export default class UserController{
  
  async createNewUser(req: FastifyRequest<{Body:createUserBodyType}>, res: FastifyReply){
    const resultValidation = new ResultValidation();
    const userCase = new UserCreateCase(new PrismaUserRepository());
    await userCase.execute(req.body, resultValidation);
    applyResult(resultValidation, res, 201);
  }

  async authorization(req: FastifyRequest<{Body:createUserBodyType}>, res: FastifyReply){
    const resultValidation = new ResultValidation();
    const userCase = new UserAuthenticateCase(new PrismaUserRepository());
    await userCase.execute(req.body, resultValidation);
    applyResult(resultValidation, res, 201);
  }

  async jwtValidate(req: FastifyRequest, res: FastifyReply){
    res.code(200).send({User: req.user})
  }

  async createADM(data: createUserBodyType){
    const resultValidation = new ResultValidation();
    const userCase = new UserCreateCase(new PrismaUserRepository());
    await userCase.execute(data, resultValidation);
    if(resultValidation.hasError()){
      console.log("ERRO AO CRIAR ADM OU ADM JA EXISTENTE")
      console.log(resultValidation.getErrorList())
    }else{
      console.log("ADMIN CRIADO COM SUCESSO!")
    }
    
  }
}