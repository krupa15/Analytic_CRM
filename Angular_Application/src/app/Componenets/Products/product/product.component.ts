import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/Models/product.model';
import { ApiService } from 'src/app/services/Connection.service';
import { DataService } from 'src/app/services/storage.service';
import { Router } from '@angular/router';
import { subscribeOn } from 'rxjs/operators';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  Products: Product[];
  logInStatus: Boolean;
  constructor(private _client: ApiService, private _data: DataService, private _router: Router) {
    this.logInStatus=sessionStorage.getItem("token")!=null;
    this._data.getLoginSatus().subscribe((data) => {
      this.logInStatus = data;
      this.checkForLogIn();
    });
    
    this.Products = [];
  }
  ngOnInit() {
    
    this.checkForLogIn();
    this._client.getProducts().subscribe((data: Product[]) => {
      this.Products = data;
    });
    
  }
  checkForLogIn() {
    if (!this.logInStatus) {
      this._router.navigate(['/about']);
    }
  }
  delete(id:number){
    this._client.DeleteProduct(id).subscribe((data)=>{
      this._client.getProducts().subscribe((data: Product[]) => {
        this.Products = data;
      });
    });
  }
  edit(p:Product){
    this._data.setSelectedProduct(p);
    this._router.navigate(['/editProduct']);
  }
  Add(){
    this._router.navigate(['/addProduct']);
  }
}
