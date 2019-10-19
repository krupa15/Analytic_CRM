import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/Models/product.model';
import { ApiService } from 'src/app/services/Connection.service';
import { DataService } from 'src/app/services/storage.service';
import { Router } from '@angular/router';
import { subscribeOn } from 'rxjs/operators';
import { Order } from 'src/app/Models/order.model';
import { Customer } from 'src/app/Models/customer.model';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  Orders: Order[];
  logInStatus: Boolean;
  constructor(private _client: ApiService, private _data: DataService, private _router: Router) {
    this.logInStatus=sessionStorage.getItem("token")!=null;
    this._data.getLoginSatus().subscribe((data) => {
      this.logInStatus = data;
      this.checkForLogIn();
    });
    
    this.Orders = [];
  }
  ngOnInit() {
    
    this.checkForLogIn();
    this._client.getOrders().subscribe((data: Order[]) => {
      this.Orders=data;
      for(let i of this.Orders){
        this._client.getCustomer(i.customerId).subscribe((data:Customer)=>{
          i.customer=data.name;
        });
        this._client.getProduct(i.productId).subscribe((data:Product)=>{
          i.product=data.name;
        });
      }
    });
    
  }
  checkForLogIn() {
    if (!this.logInStatus) {
      this._router.navigate(['/about']);
    }
  }
  delete(id:number){
    this._client.DeleteOrder(id).subscribe((data)=>{
      this._client.getOrders().subscribe((data: Order[]) => {
        this.Orders=data;
        for(let i of this.Orders){
          this._client.getCustomer(i.customerId).subscribe((data:Customer)=>{
            i.customer=data.name;
          });
        }
      });
    });
  }
  edit(p:Order){
    this._data.setSelectedOrder(p);
    this._router.navigate(['/editOrder']);
  }
  Add(){
    this._router.navigate(['/addOrder']);
  }
}
