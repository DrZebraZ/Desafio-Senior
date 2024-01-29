import { Component, Input } from '@angular/core';
import axios from 'axios';
import { environment } from '../../environments/environment.development';
import { NgFor } from '@angular/common';
import { RedirectToLogin } from '../app.routes';

@Component({
  selector: 'app-almox',
  standalone: true,
  imports: [NgFor],
  templateUrl: '../html/almox.component.html',
  styleUrl: '../css/almox.component.css'
})
export class AlmoxComponent {
  @Input() data:any = null;
  constructor(){
    this.getData()
  }
  getData(){
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('AuthToken')}`
    };
    if(!localStorage.getItem('AuthToken')){
      RedirectToLogin()
    }
    axios.get(`${environment.apiUrl}/storekeeper/getRequests`, {headers}).then((response)=>{
      this.data = response.data.data
      console.log(this.data)
    })
  }
  selecionar(id:string, event:any){
    event.preventDefault()
    console.log(id)
    window.location.href = `almox/${id}`
  }
}
