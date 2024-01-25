import { Prisma, User } from '@/prisma/generated/client'
import { UserRepository } from "../user.repository.model";
import { ResultValidation } from "@/utils/result-validation";
import { ERROR_TYPES } from "@/errors/ErrorTypes";

export class InMemoryUserRepository implements UserRepository{
  
  public items: User[] = []

  async findByUsername(username: string, resultValidation: ResultValidation): Promise<void> {
    const user = this.items.find(item => item.username === username)
    if (user){
      resultValidation.setResult({data: user})
    }
  }

  async create(data: Prisma.UserCreateInput|any, resultValidation: ResultValidation): Promise<void> {
    this.items.push(data)
    resultValidation.setResult({data: data})
  }
  
}