import { z } from "zod";
import { buildJsonSchemas } from 'fastify-zod'

const name = z.string({required_error:"Nome necessário"})
const description = z.string({required_error:"Descrição necessária"})
const price = z.string({required_error:"Valor necessário"})

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