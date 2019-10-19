import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { OnInit } from "@angular/core";
import { LogInModel } from 'src/app/Models/login.model';
import { ApiService } from 'src/app/services/Connection.service';
import { DataService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-Log-In',
  templateUrl: './logInPage.component.html'
})
export class LogInComponent implements OnInit {
  title = 'Log In';
  public logIn: LogInModel;
  public Username: string;
  public Password: string;
  public error: string;
  constructor(private _api: ApiService, private _router: Router,private _data:DataService) {
    this.logIn = new LogInModel();
    let token = sessionStorage.getItem("token");
    if (token != null) {
      this._router.navigate(['']);
      this._data.updateLogInSatus();
    }
    this.error = "";
  }
  ngOnInit(): void {
  }
  public LogInButton() {
    if (this.logIn.Password == null || this.logIn.Password == "") {
      this.error = "Password and Username must not be empty";
    }
    else if (this.logIn.Username == null || this.logIn.Username == "") {
      this.error = "Password and Username must not be empty";
    }
    else {
      this._api.postLogin(this.logIn).subscribe((data) => {
        if (data.loginResult == "fail") {
          sessionStorage.removeItem("token");
          this._data.updateLogInSatus();
          this.error = "Invalid Username or Password";
          console.log("fail");
        }
        else if (data.loginResult == "success") {
          sessionStorage.setItem("token", data.token);
          this._data.updateLogInSatus();
          console.log(data.token);
          this._router.navigate(['']);
        }
      });
    }
  }
}