import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormComponent } from './form.component';
import { environment } from '../../environments/environment.development';
import axios from 'axios';
import Toastify from 'toastify-js';
import { RedirectToLogin } from '../app.routes';

@Component({
  selector: 'app-almoxItens',
  standalone: true,
  imports: [FormComponent],
  templateUrl: '../html/almoxItem.component.html',
  styleUrl: '../css/almoxItem.component.css'
})
export class AlmoxItemComponent implements OnInit {
  @Input() itemId: any;
  @Input() itemData: any;
  @Input() observation: string|null = '';
  @Input() disabled: boolean = true;
  @Input() status: string = 'awaiting';
  ngOnInit(): void{
    this.itemId = this.route.snapshot.paramMap.get('item_id');
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('AuthToken')}`
    };
    if(!localStorage.getItem('AuthToken')){
      RedirectToLogin()
    }
    axios.get(`${environment.apiUrl}/storekeeper/getRequests/${this.itemId}`, {headers}).then((response)=>{
      this.itemData = response.data.data
    })
  }

  constructor(private route: ActivatedRoute){
    
  }
  onSubmit(event:any){
    event.preventDefault()
    const headers={
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('AuthToken')}`
    };
    if(!localStorage.getItem('AuthToken')){
      RedirectToLogin()
    }
    const data = {
      status: this.status,
      observation: this.observation
    }
    axios.patch(`${environment.apiUrl}/storekeeper/updateRequest/${this.itemId}`, data, {headers}).then((response)=>{
      if(response.status === 200){  
        Toastify({
          text: `${response.status} OK`,
          className: "info",
          duration: 3000,
          offset:{
            x: '2em',
            y: '2em'
          }
        }).showToast();
        window.location.href = 'almox'
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

  handleChangeObservation(event:any){
    this.observation = event.target.value
  }

  handleChangeRadio(event:any){
    this.status = event.target.value
    if(this.status == 'refused'){
      this.disabled = false;
    }else{
      this.disabled = true;
      this.observation = null
    }

  }
  
  
}
