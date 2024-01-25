import { z } from 'zod'
import { buildJsonSchemas } from 'fastify-zod'

const name = z.string().nullable().default('')
const description = z.string().nullable().default('')
const status = z.string().nullable().default('')

export const getFiltered = z.object({
  name,
  description,
  status
}).nullable()
export type getFilteredType = z.infer<typeof getFiltered>



const models = {
  getFiltered
}

const options = {
  $id: "adminSchemas"
}

export const { schemas : adminSchemas, $ref} = buildJsonSchemas(models, options)