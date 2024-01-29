import { Routes, Router } from '@angular/router';
import {  AuthGuardService as AuthGuard } from './js/auth/auth-guard.service';
import { SolicitaComponent } from './js/solicita.component';
import { LoginComponent } from './js/login.component';
import { AlmoxComponent } from './js/almox.component';
import { AlmoxItemComponent } from './js/almoxItem.component';
import { AdminComponent } from './js/admin.component';

export const routes: Routes = [
  { 
    path: 'login',
    component: LoginComponent
  },
  { 
    path: 'solicitar',
    component: SolicitaComponent,
    canActivate: [AuthGuard],
    data: ['requester','admin']
  },
  {
    path: 'almox',
    component: AlmoxComponent,
    canActivate: [AuthGuard],
    data: ['storekeeper','admin'],
  },
  {
    path: 'almox/:item_id',
    component: AlmoxItemComponent,
    canActivate: [AuthGuard],
    data: ['storekeeper','admin']
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    data: ['admin']
  },
  { path: "**", redirectTo: '/login'}
];

export const RedirectToLogin = () =>{
  localStorage.removeItem('AuthToken')
  localStorage.removeItem('Roles')
  localStorage.removeItem('User')
  localStorage.clear();
  window.location.href = 'login'
}