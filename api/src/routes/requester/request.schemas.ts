import { z } from "zod";
import { buildJsonSchemas } from 'fastify-zod'

const name = z.string({required_error:"Nome necessário"}).min(3)
const description = z.string({required_error:"Descrição necessária"}).min(3)
const price = z.string({required_error:"Valor necessário"}).min(3)

export const createRequestBody = z.object({
  name,
  description,
  price
})
export type createRequestBodyType = z.infer<typeof createRequestBody>

const models = {
  createRequestBody
}

const options = {
  $id: "requestSchemas"
}

export const { schemas : requestSchemas, $ref} = buildJsonSchemas(models, options)