import { Component, Input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RedirectToLogin } from '../app.routes';
// import { AlmoxComponent } from './almox.component'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: '../html/app.component.html',
  styleUrl: '../css/app.component.css'
})
export class AppComponent {
  constructor(){
  }
  
  deslogar(event:any){
    RedirectToLogin()
  }
  title="app-desafio"
}
