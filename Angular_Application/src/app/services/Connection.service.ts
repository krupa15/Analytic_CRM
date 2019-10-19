import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest, HttpClient, HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseToken } from '../Models/response.model';
import { LogInModel } from '../Models/login.model';
import { Register } from '../Models/register.model';
import { Product } from '../Models/product.model';
import { strictEqual } from 'assert';
import { Customer } from '../Models/customer.model';
import { Order } from '../Models/order.model';
const endpoint = 'https://localhost:5001/api/';
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' })
};
@Injectable({
    providedIn: 'root'
})
export class ApiService {
    public constructor(private _client: HttpClient) {
        
    }
    postLogin(Data: LogInModel): Observable<ResponseToken> {
        return this._client.post<ResponseToken>(endpoint + "Auth/token", Data, httpOptions);
    }
    register(register:Register):Observable<ResponseToken>{
        return this._client.post<ResponseToken>(endpoint + "Auth/register", {Username:register.username,Password:register.password,ConfirmPassword:register.confirmPassword});
    }
    getProducts():Observable<Product[]>{
        return this._client.get<Product[]>(endpoint+"Product/all");
    }
    getProduct(id:number):Observable<Product>{
        return this._client.get<Product>(endpoint+"Product/"+id.toString());
    }
    DeleteProduct(id:number):Observable<string>{
        return this._client.delete<string>(endpoint+"Product/"+id.toString());
    }
    AddProduct(product:Product):Observable<string>{
        return this._client.post<string>(endpoint+"Product/create",{Name:product.name,Price:product.price,Quantity:product.quantity,Catagory:product.catagory});
    }
    UpdateProduct(product:Product):Observable<string>{
        return this._client.put<string>(endpoint+"Product/update",{Id:product.id,Name:product.name,Price:product.price,Quantity:product.quantity,Catagory:product.catagory});
    }
    getCustomers():Observable<Customer[]>{
        return this._client.get<Customer[]>(endpoint+"Customer/all");
    }
    getCustomer(id:number):Observable<Customer>{
        return this._client.get<Customer>(endpoint+"Customer/"+id.toString());
    }
    DeleteCustomer(id:number):Observable<string>{
        return this._client.delete<string>(endpoint+"Customer/"+id.toString());
    }
    AddCustomer(customer:Customer):Observable<string>{
        return this._client.post<string>(endpoint+"Customer/create",{Name:customer.name,Email:customer.email,ContactNumber:customer.contactNumber});
    }
    UpdateCustomer(customer:Customer):Observable<string>{
        return this._client.put<string>(endpoint+"Customer/update",{Id:customer.id,Name:customer.name,Email:customer.email,ContactNumber:customer.contactNumber});
    }
    getOrders():Observable<Order[]>{
        return this._client.get<Order[]>(endpoint+"Order/all");
    }
    getOrder(id:number):Observable<Order>{
        return this._client.get<Order>(endpoint+"Order/"+id.toString());
    }
    DeleteOrder(id:number):Observable<string>{
        return this._client.delete<string>(endpoint+"Order/"+id.toString());
    }
    AddOrder(Order:Order):Observable<string>{
        return this._client.post<string>(endpoint+"Order/create",{CustomerId:Order.customerId,ProductId:Order.productId,PlacedDate:Order.placedDate,ShippedDate:Order.shippedDate,Quantity:Order.quantity});
    }
    UpdateOrder(Order:Order):Observable<string>{
        return this._client.put<string>(endpoint+"Order/update",{Id:Order.id,CustomerId:Order.customerId,ProductId:Order.productId,PlacedDate:Order.placedDate,ShippedDate:Order.shippedDate,Quantity:Order.quantity});
    }
}