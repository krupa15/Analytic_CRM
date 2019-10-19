import { Component, OnInit, ComponentFactoryResolver, Type } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/storage.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  logIn: Observable<Boolean>;
  login: Boolean;
  constructor(private _router: Router,private _data:DataService) {
    this.login=sessionStorage.getItem("token")!=null
    this.logIn = this._data.getLoginSatus();
  }

  ngOnInit() {
    this.logIn.subscribe((data)=>{
      this.login=data;
      if(!data){
        this._router.navigate(["/about"]);
      }
    });
  }
  logOut() {
    sessionStorage.removeItem("token");
    this._data.updateLogInSatus();
    this._router.navigate(["/about"]);
  }

}
