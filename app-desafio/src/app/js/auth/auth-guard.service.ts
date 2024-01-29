// src/app/auth/auth-guard.service.ts
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {
  constructor(private auth: AuthService, private router: Router) {
    console.log("AUTH GUARD STARTED");
  }

  async canActivate(route: ActivatedRouteSnapshot): Promise<boolean | UrlTree> {
    const willPass = await this.auth.isAuthenticated(route)
    if(willPass){
      return true
    }else{
      return this.router.parseUrl('/login');
    } 
  }
}