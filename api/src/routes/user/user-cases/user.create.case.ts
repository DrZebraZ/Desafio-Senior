import { ResultValidation } from "@/utils/result-validation";
import { createUserBodyType, insertUserDatabaseBody } from "../user.schemas";
import { hash } from "bcryptjs"
import { randomUUID } from "crypto";
import { ERROR_TYPES } from "@/errors/ErrorTypes";
import { UserRepository } from "../user.repository.model";

export class UserCreateCase{
  constructor(private repository: UserRepository){}

  async execute({username, password}: createUserBodyType, resultValidation: ResultValidation):Promise<void>{
    await this.repository.findByUsername(username, resultValidation)
    if (resultValidation.hasError()){
      return
    }
    
    if (resultValidation.getResult().data?.id){  
      resultValidation.addError(ERROR_TYPES.user.EMAIL_ALREADY_EXISTS.TAG, ERROR_TYPES.user.EMAIL_ALREADY_EXISTS.MESSAGE)
      return
    }

    const passwordHashed = (await hash(password, 6)).toString()

    const createBodySchema = insertUserDatabaseBody.parse({
      id: randomUUID(),
      username,
      password: passwordHashed,
      created_at: new Date()
    })
    
    await this.repository.create(createBodySchema, resultValidation)
    
  }

}