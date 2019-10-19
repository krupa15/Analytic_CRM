import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/Models/order.model';
import { Product } from 'src/app/Models/product.model';
import { Customer } from 'src/app/Models/customer.model';
import { ApiService } from 'src/app/services/Connection.service';
import { DataService } from 'src/app/services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css']
})
export class AddOrderComponent implements OnInit {
  Order:Order;
  Products:Product[];
  Customers:Customer[];
  logInStatus: Boolean;
  constructor(private _client: ApiService, private _data: DataService, private _router: Router) {
    this.logInStatus=sessionStorage.getItem("token")!=null;
    this._data.getLoginSatus().subscribe((data) => {
      this.logInStatus = data;
      this.checkForLogIn();
    });
  }
  checkForLogIn() {
    if (!this.logInStatus) {
      this._router.navigate(['/about']);
    }
  }
  ngOnInit() {
    this.Order=new Order();
    this._client.getCustomers().subscribe((data)=>{
      this.Customers=data;
     
    });
    this._client.getProducts().subscribe((data)=>{
      this.Products=data;
    });
  }
  Add(){
    this._client.AddOrder(this.Order).subscribe((data)=>{
      this._router.navigate(["/order"]);
    })
  }

}
