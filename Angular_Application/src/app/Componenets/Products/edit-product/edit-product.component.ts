import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/Connection.service';
import { DataService } from 'src/app/services/storage.service';
import { Router } from '@angular/router';
import { Product } from 'src/app/Models/product.model';

@Component({
  selector: 'edit-add-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  logInStatus: Boolean;
  product:Product;
  constructor(private _client: ApiService, private _data: DataService, private _router: Router) {
    this.logInStatus=sessionStorage.getItem("token")!=null;
    this._data.getLoginSatus().subscribe((data) => {
      this.logInStatus = data;
    });
    this.checkForLogIn(); 
  }
  ngOnInit() {
    this.product=this._data.getSelectedProduct();
  }
  checkForLogIn() {
    if (!this.logInStatus) {
      this._router.navigate(['/about']);
    }
  }
  Add(){
    this._client.UpdateProduct(this.product).subscribe((data)=>{
      this._router.navigate(['/product']);
    });
  }
}
