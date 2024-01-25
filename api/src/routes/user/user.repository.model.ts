import { Prisma } from '@/prisma/generated/client'
import { ResultValidation } from '@/utils/result-validation'

export interface UserRepository{
  findByUsername(username: string, resultValidation: ResultValidation): Promise<void>
  create(data: Prisma.UserCreateInput, resultValidation: ResultValidation): Promise<void>
}