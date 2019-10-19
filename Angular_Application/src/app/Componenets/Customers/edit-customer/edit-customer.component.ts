import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/Connection.service';
import { DataService } from 'src/app/services/storage.service';
import { Router } from '@angular/router';
import { Product } from 'src/app/Models/product.model';
import { Customer } from 'src/app/Models/customer.model';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent implements OnInit {
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
    this.customer=this._data.getSelectedCustomer();
  }
  checkForLogIn() {
    if (!this.logInStatus) {
      this._router.navigate(['/about']);
    }
  }
  Add(){
    
    this._client.UpdateCustomer(this.customer).subscribe((data)=>{
      this._router.navigate(['/customer']);
    });
  }
}