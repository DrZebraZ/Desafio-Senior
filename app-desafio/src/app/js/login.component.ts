import { Component, Input } from '@angular/core';
import axios from 'axios';
import { environment } from '../../environments/environment.development';
import { RedirectToLogin } from '../app.routes';
import Toastify from 'toastify-js';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: '../html/login.component.html',
  styleUrl: '../css/login.component.css'
})
export class LoginComponent {
  private username: string = '';
  private password: string = '';
  
  constructor(){
    if(localStorage.getItem('Roles')){
      this.redirect(localStorage.getItem('Roles'))
    }
  }

  async makeLogin(event: any){
    event.preventDefault()
    await axios.post(`${environment.apiUrl}/user/authorization`, {username: this.username, password: this.password}).then((response)=>{
      console.log(response.data)
      if(response.data.data){
        localStorage.setItem('AuthToken', response.data.data.AuthToken)
        const roles:string = response.data.data.User.roles
        localStorage.setItem('Roles', roles)
        this.redirect(roles)        
      }
    }).catch((error)=>{
      Toastify({
        text: `${error.response.status} ${error.response.data.message}`,
        className: "danger",
        duration: 4000,
        offset:{
          x: '2em',
          y: '2em'
        },
        style:{background:'red'}
      }).showToast();
    })
  }

  redirect(roles:any){
    if(localStorage.getItem('AuthToken')){
      if(roles.includes('requester')){
        window.location.href = 'solicitar'
      }else if(roles.includes('storekeeper')){
        window.location.href = 'almox'
      }else if(roles.includes('admin')){
        window.location.href = 'admin'
      }
    }else{
      RedirectToLogin()
    }
  }

  handleUsernameChange(event: any):void{
    let username: string = event.target.value;
    this.username = username
  }

  handlePasswordChange(event: any):void{
    let password: string = event.target.value;
    this.password = password
  }
}
