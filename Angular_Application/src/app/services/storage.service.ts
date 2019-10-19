import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Product } from '../Models/product.model';
import { Customer } from '../Models/customer.model';
import { Order } from '../Models/order.model';

@Injectable({
    providedIn:'root'
})
export class DataService{
    LogIN:Subject<Boolean>;
    SelectedProduct:Product;
    SelectedCustomer:Customer;
    SelectedOrder:Order;
    public constructor(){
        this.LogIN=new Subject<Boolean>();
        if( sessionStorage.getItem("token")==null){
            this.LogIN.next(false);
        }
        else{
            this.LogIN.next(true);
            
        }
    }
    getLoginSatus():Observable<Boolean>{
        return this.LogIN.asObservable();
    }
    updateLogInSatus(){
       
        if( sessionStorage.getItem("token")==null){
            this.LogIN.next(false);
            console.log(sessionStorage.getItem("token"));
        }
        else{
            this.LogIN.next(true);
        }
    }
    setSelectedProduct(p:Product){
        this.SelectedProduct=p;
    }
    getSelectedProduct(){
        return this.SelectedProduct;
    }
    setSelectedOrder(p:Order){
        this.SelectedOrder=p;
    }
    getSelectedOrder(){
        return this.SelectedOrder;
    }
    setSelectedCustomer(p:Customer){
        this.SelectedCustomer=p;
    }
    getSelectedCustomer(){
        return this.SelectedCustomer;
    }
}