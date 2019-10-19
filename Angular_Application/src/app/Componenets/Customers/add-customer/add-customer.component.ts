import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/Connection.service';
import { DataService } from 'src/app/services/storage.service';
import { Router } from '@angular/router';
import { Product } from 'src/app/Models/product.model';
import { Customer } from 'src/app/Models/customer.model';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {
  logInStatus: Boolean;
  customer:Customer;
  constructor(private _client: ApiService, private _data: DataService, private _router: Router) {
    this.logInStatus=sessionStorage.getItem("token")!=null;
    this._data.getLoginSatus().subscribe((data) => {
      this.logInStatus = data;
    });
    this.checkForLogIn();
  }

  ngOnInit() {
    this.customer=new Customer();
  }
  checkForLogIn() {
    if (!this.logInStatus) {
      this._router.navigate(['/about']);
    }
  }
  Add(){
    
    this._client.AddCustomer(this.customer).subscribe((data)=>{
      this._router.navigate(['/customer']);
    });
  }
}