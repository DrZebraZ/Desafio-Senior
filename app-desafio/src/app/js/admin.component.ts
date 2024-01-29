import { Component, Input } from '@angular/core';
import axios from 'axios';
import { environment } from '../../environments/environment.development';
import { NgFor } from '@angular/common';
import Toastify from 'toastify-js';
import { RedirectToLogin } from '../app.routes';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [NgFor],
  templateUrl: '../html/admin.component.html',
  styleUrl: '../css/admin.component.css'
})
export class AdminComponent {
  @Input() data:any = null;
  @Input() username:string = '';
  @Input() password:string = '';
  @Input() roles:string = '';
  @Input() filterStatus:string = '';
  @Input() nameFilter:string='';
  @Input() descFilter:string='';
  @Input() filtros:string='?'

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
    axios.get(`${environment.apiUrl}/admin/getFiltered${this.filtros}`, {headers}).then((response)=>{
      this.data = response.data.data
      console.log(this.data)
    }).catch((error)=>{
      if(error.response.status==401){
        RedirectToLogin()
      }
    })
  }

  buscarFiltros(event: any){
    event.preventDefault()
    var newFilter = '?'
    if(this.nameFilter){
      newFilter+=`name=${this.nameFilter}&`
    }
    if(this.filterStatus){
      newFilter+=`status=${this.filterStatus}&`
    }
    if(this.descFilter){
      newFilter+=`description=${this.descFilter}&`
    }
    this.filtros = newFilter
    this.getData()
  }

  handleDescFilterChange(event: any){
    this.descFilter = event.target.value
  }

  handleNameFilterChange(event: any){
    this.nameFilter = event.target.value
  }
  handleChangeRadioStatus(event: any){
    this.filterStatus = event.target.value
  }

  handleChangeRadio(event: any){
    this.roles = event.target.value
  }

  handlePasswordChange(event:any){
    this.password = event.target.value
  }

  handleUsernameChange(event:any){
    this.username = event.target.value
  }

  selecionar(id:string, event:any){
    event.preventDefault()
    console.log(id)
    window.location.href = `almox/${id}`
  }

  addUser(event:any){
    event.preventDefault()
    const headers={
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('AuthToken')}`
    };
    if(!localStorage.getItem('AuthToken')){
      RedirectToLogin()
    }
    const data = {
      username: this.username,
      password: this.password,
      roles: this.roles
    }
    axios.post(`${environment.apiUrl}/user/create`, data, {headers}).then((response)=>{
      if(response.status === 201){  
        Toastify({
          text: `${response.status} OK`,
          className: "info",
          duration: 3000,
          offset:{
            x: '2em',
            y: '2em'
          }
        }).showToast();
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
      if(error.response.status==401){
        RedirectToLogin()
      }
    })
  }
}
