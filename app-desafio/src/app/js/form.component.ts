import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [],
  templateUrl: '../html/form.component.html',
  styleUrl: '../css/form.component.css'
})
export class FormComponent {
  @Input() name:any = '';
  @Input() desc:any = '';
  @Input() price:any = 'R$ 0.00';
  @Input() makeRequest: any;
  @Input() isDisabled:any = false;
  constructor() { }

  async enviarForm(event:any){
    const response = await this.makeRequest(this.name, this.desc, this.price, event)
    console.log("response: " + response)
    if(response){
      this.name = ''
      this.desc = ''
      this.price = 'R$ 0.00'
    }
  }

  handleNameChange(event: any):void{
    let name: string = event.target.value;
    this.name = name
  }

  handleDescChange(event: any):void{
    let desc: string = event.target.value;
    this.desc = desc
  }

  formatarPreco(event: any): void {
    let preco: string = event.target.value;

    // Remove caracteres não numéricos
    preco = preco.replace(/\D/g, '');
    if(preco.length == 1){
      preco = '0.0' + preco
    }else if(preco.length == 2){
      preco = '0.' + preco
    }else{
      preco = preco.slice(0,-2) + '.' + preco.slice(-2)
    }
    if(preco[0]== '0' && preco[1]== '0'){
      preco = preco.slice(1)
    }
    if(preco.length == 5 && preco[0] == '0'){
      preco = preco.slice(1)
    }
    preco = 'R$ '+preco
    this.price = preco
    event.target.value = preco;
  }
}
