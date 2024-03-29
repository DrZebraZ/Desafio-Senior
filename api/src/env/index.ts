import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  DATABASE_URL: z.string(),
  NODE_ENV: z.string(),
  PORT: z.coerce.number().default(3000),
  JWTKEY: z.string(),
  ADM_USERNAME: z.string().min(5),
  ADM_PASSWORD: z.string().min(8)
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false){
  console.log('Invalid environment variables', _env.error.format())
  throw new Error('Invalid environment variables')
}

export default _env.data