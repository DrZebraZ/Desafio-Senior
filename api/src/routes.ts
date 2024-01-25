import { FastifyInstance } from "fastify";
import { UserRoutes } from "./routes/user/user.routes";
import { RequestRoutes } from "./routes/requester/request.routes";
import { StorekeeperRoutes } from "./routes/storekeeper/storekeeper.routes";
import { AdminRoutes } from "./routes/admin/admin.routes";


export default async function setRoutes(app: FastifyInstance){
  app.register(UserRoutes, {prefix: "/user"})
  app.register(RequestRoutes, {prefix: "/request"})
  app.register(StorekeeperRoutes, {prefix: "/storekeeper"})
  app.register(AdminRoutes, {prefix: "/admin"})
}