import { z } from 'zod'
import { buildJsonSchemas } from 'fastify-zod'

const id = z.string().uuid()
const userusername = z.string({required_error:"Must provide a valid username"})
const password = z.string({required_error:"Must provide a password"}).min(8)
const roles = z.enum(['requester', 'storekeeper', 'admin'])
const exp = z.number()

export const createUserBody = z.object({
  userusername,
  password
})
export type createUserBodyType = z.infer<typeof createUserBody>

export const insertUserDatabaseBody = z.object({
  id,
  username,
  password
})
export type insertUserDatabaseBodyType = z.infer<typeof insertUserDatabaseBody>

export const loginUserBody = z.object({
  email,
  password
})
export type loginUserBodyType = z.infer<typeof loginUserBody>

export const JWTBody = z.object({
  id,
  username,
  email,
  roles
})
export type JWTBodyType = z.infer<typeof JWTBody>

export const JWTCreationBody = z.object({
  id,
  username,
  email,
  exp
})
export type JWTCreationBodyType = z.infer<typeof JWTCreationBody>

const models = {
  createUserBody,
  loginUserBody
}

const options = {
  $id: "userSchemas"
}

export const { schemas : userSchemas, $ref} = buildJsonSchemas(models, options)