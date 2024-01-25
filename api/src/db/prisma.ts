import env from '@/env'
import { PrismaClient } from '@/prisma/generated/client'

export const prisma = new PrismaClient({
  log: env.NODE_ENV === 'dev' ? ['query'] : [],
})