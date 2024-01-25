import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from "fastify";
import { JWTBody, JWTBodyType } from "../user/user.schemas";
import jsonwebtoken from 'jsonwebtoken';
import _env from '../../env/index';


export const RequireAuth = function (request:FastifyRequest, reply:FastifyReply, done:HookHandlerDoneFunction): void{
  try{
    const user = getUser(request, reply)
    request.user = user
    done()
  }catch(e){
    console.log(e)
    reply.code(401).send('UNAUTHORIZED')
  }
}

export const RequireRequester = function (request:FastifyRequest, reply:FastifyReply, done:HookHandlerDoneFunction): void{
  try{
    const user = getUser(request, reply)
    let isADM = user.roles.includes("admin")
    let isRequester = user.roles.includes("requester")
    if(isADM || isRequester){
      request.user = user
      done()
    }else{
      reply.code(401).send('UNAUTHORIZED')
    }
  }catch(e){
    console.log(e)
    reply.code(401).send('UNAUTHORIZED')
  }
}

export const RequireStorekeeper = function (request:FastifyRequest, reply:FastifyReply, done:HookHandlerDoneFunction): void{
  try{
    const user = getUser(request, reply)
    let isADM = user.roles.includes("admin")
    let isStorekeeper = user.roles.includes("storekeeper")
    if(isADM || isStorekeeper){
      request.user = user
      done()
    }else{
      reply.code(401).send('UNAUTHORIZED')
    }
  }catch(e){
    console.log(e)
    reply.code(401).send('UNAUTHORIZED')
  }
}

export const RequireADM = function (request:FastifyRequest, reply:FastifyReply, done:HookHandlerDoneFunction): void{
  try{
    const user = getUser(request, reply)
    let isADM = user.roles.includes("admin")
    if(isADM){
      request.user = user
      done()
    }else{
      reply.code(401).send('UNAUTHORIZED')
    }
    
  }catch(e){
    console.log(e)
    reply.code(401).send('UNAUTHORIZED')
  }
}

const getUser = function(request:FastifyRequest, reply:FastifyReply):JWTBodyType|any{
  try{
    const [,token] = request.headers.authorization?.split(' ') || [' ',' '];
    if(!token){
      reply.code(401).send('Token not Found')
      return
    }
    var decoded = jsonwebtoken.verify(token, _env.JWTKEY);
    console.log(decoded)
    if(!decoded){
      reply.code(401).send('UNAUTHORIZED')
      return
    }
    const user = JWTBody.parse(decoded)
    return user
  }catch(e){
    console.log(e)
    reply.code(401).send('UNAUTHORIZED')
  }
}