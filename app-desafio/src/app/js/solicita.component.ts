import { Component, Input } from '@angular/core';
import { FormComponent } from './form.component';
import Toastify from 'toastify-js';
import axios from 'axios';
import { environment } from '../../environments/environment.development';
import { Router } from '@angular/router';
import { RedirectToLogin } from '../app.routes';

@Component({
  selector: 'app-solicita',
  standalone: true,
  imports: [FormComponent],
  templateUrl: '../html/solicita.component.html',
  styleUrl: '../css/solicita.component.css'
})
export class SolicitaComponent {

  constructor(private router: Router) {} // Injete o Router
  async makeRequest(name: string, desc: string, price: string, event: any):Promise<boolean>{
    event.preventDefault()
    const data = {name:name, description:desc, price:price}
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('AuthToken')}`
    };
    if(!localStorage.getItem('AuthToken')){
      RedirectToLogin()
    }
    var result = false
    await axios.post(`${environment.apiUrl}/request/create`,data,{headers}).then((response)=>{
      console.log(response)
      if(response.status === 201){  
        Toastify({
          text: `${response.status} ${response.data.data}`,
          className: "info",
          duration: 3000,
          offset:{
            x: '2em',
            y: '2em'
          }
        }).showToast();
      }
      result = true    
    }).catch((error)=>{
      if(error.response.status==401){
        RedirectToLogin()
      }
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
      result = false
      
    })
    return result
  }
}
