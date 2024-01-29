import { Injectable, Input } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../../environments/environment.development';
import jsonwebtoken from 'jsonwebtoken';
import axios from 'axios';
import { ActivatedRouteSnapshot } from '@angular/router';
@Injectable()
export class AuthService {

  @Input() user:any = null;

  constructor() {
    console.log("AUTH SERVICE STARTED");
  }
  // ...
  public async isAuthenticated(data: ActivatedRouteSnapshot):Promise<boolean> {
    const perms = data.data
    const token = localStorage.getItem('AuthToken');
    if(!token){
      return false
    }else{
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      };
      await axios.get(`${environment.apiUrl}/user/validate`, {headers}).then((response)=>{
        if(response.data.User){
          this.user = response.data.User
          localStorage.setItem('Roles', this.user.roles)
        }
      }).catch((error)=>{
        console.log(error)
        localStorage.removeItem('Roles')
        localStorage.removeItem('AuthToken')
      })
    }
    const userRoles: string = this.user.roles
    for( var x in perms){
      if(userRoles.includes(perms[x])){
        return true
      }
    }
    return false
  }
}


// const [,token] = request.headers.authorization?.split(' ') || [' ',' '];
//     if(!token){
//       reply.code(401).send('Token not Found')
//       return
//     }
//     var decoded = jsonwebtoken.verify(token, _env.JWTKEY);
//     console.log(decoded)
//     if(!decoded){
//       reply.code(401).send('UNAUTHORIZED')
//       return
//     }
//     const user = JWTBody.parse(decoded)
//     return user