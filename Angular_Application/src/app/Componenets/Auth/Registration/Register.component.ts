import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { OnInit } from "@angular/core";
import { ApiService } from 'src/app/services/Connection.service';
import { Register } from 'src/app/Models/register.model';
import { DataService } from 'src/app/services/storage.service';

@Component({
    selector: 'app-Register',
    templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
    public register: Register;
    constructor(private _api: ApiService, private _router: Router,private _data:DataService) {
        this.register = new Register();
    }
    ngOnInit(): void {
        
    }
    Register() {
        this._api.register(this.register).subscribe((data) => {
            if (data.loginResult == "fail") {
                sessionStorage.removeItem("token");
                this._data.updateLogInSatus();
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