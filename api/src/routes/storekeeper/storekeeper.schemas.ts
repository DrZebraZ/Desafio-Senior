import { z } from 'zod'
import { buildJsonSchemas } from 'fastify-zod'

const id = z.string()
const request_id = z.string()
const respondent_id = z.string()
const status = z.enum(['awaiting', 'confirmed', 'refused'])
const observation = z.string().nullable()
const updated_at = z.coerce.date()

export const makeResponse = z.object({
  status,
  observation
})
export type makeResponseType = z.infer<typeof makeResponse>

export const insertResponseDatabase = z.object({
  id,
  request_id,
  respondent_id,
  status,
  observation,
  updated_at
})
export type insertResponseDatabaseType = z.infer<typeof insertResponseDatabase>




const models = {
  makeResponse,
  insertResponseDatabase
}

const options = {
  $id: "storekeeperSchemas"
}

export const { schemas : storekeeperSchemas, $ref} = buildJsonSchemas(models, options)