import { FastifyInstance } from "fastify";
import { userSchemas } from "./routes/user/user.schemas";
import { requestSchemas } from "./routes/requester/request.schemas";
import { storekeeperSchemas } from "./routes/storekeeper/storekeeper.schemas";
import { adminSchemas } from "./routes/admin/admin.schema";

export default async function setSchemas(app: FastifyInstance){
  try{
    for (let schema of [
      ...userSchemas, ...requestSchemas, ...storekeeperSchemas, ...adminSchemas
    ]){
      app.addSchema(schema)
    }
  }catch(err){
    console.log(err)
  }
}