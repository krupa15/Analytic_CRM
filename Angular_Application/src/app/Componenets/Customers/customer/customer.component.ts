import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/Models/customer.model';
import { ApiService } from 'src/app/services/Connection.service';
import { DataService } from 'src/app/services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
 logInStatus:Boolean;
 Customers:Customer[];
  constructor(private _client: ApiService, private _data: DataService, private _router: Router) {
    this.logInStatus=sessionStorage.getItem("token")!=null;
    this._data.getLoginSatus().subscribe((data) => {
      this.logInStatus = data;
      this.checkForLogIn();
    });
    
    this.Customers = [];
  }
  ngOnInit() {
    
    this.checkForLogIn();
    this._client.getCustomers().subscribe((data: Customer[]) => {
      this.Customers = data;
    });
    
  }
  checkForLogIn() {
    if (!this.logInStatus) {
      this._router.navigate(['/about']);
    }
  }
  delete(id:number){
    this._client.DeleteCustomer(id).subscribe((data)=>{
      this._client.getCustomers().subscribe((data: Customer[]) => {
        this.Customers = data;
      });
    });
  }
  edit(p:Customer){
    this._data.setSelectedCustomer(p);
    this._router.navigate(['/editCustomer']);
  }
  Add(){
    this._router.navigate(['/addCustomer']);
  }
}
