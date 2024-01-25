import UserController from '@/routes/user/user.controllers'
import env from '@/env'

export default async function CreateADM(){
  const controller = new UserController();
  controller.createADM({
    username: env.ADM_USERNAME,
    password: env.ADM_PASSWORD,
    roles: 'admin'
  })
}