import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  login:boolean;
  public constructor(){
    this.login = sessionStorage.getItem("token") == null;
  }
  title = 'analyticCRM';
}
