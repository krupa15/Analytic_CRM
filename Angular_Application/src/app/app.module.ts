import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule, MatFormFieldModule, MatInputModule, MatSelectModule } from '@angular/material';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './Componenets/sidebar/sidebar.component';
import { DashboardComponent } from './Componenets/Deshboard/dashboard/dashboard.component';
//import { Routes, RouterModule } from '@angular/router';
import { OrderComponent } from './Componenets/Orders/order/order.component';
import { CustomerComponent } from './Componenets/Customers/customer/customer.component';
import { ProductComponent } from './Componenets/Products/product/product.component';
import { AboutComponent } from './Componenets/about/about.component';
import { AddCustomerComponent } from './Componenets/Customers/add-customer/add-customer.component';
import { AddProductComponent } from './Componenets/Products/add-product/add-product.component';
import { AddOrderComponent } from './Componenets/Orders/add-order/add-order.component';
import { ApiService } from './services/Connection.service';
import { Router } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { ApiInterceptor } from './Interceptor/api.interceptor';
import { LogInComponent } from './Componenets/Auth/LogInPage/LogInPage.component';
import { RegisterComponent } from './Componenets/Auth/Registration/Register.component';
import { DataService } from './services/storage.service';
import { EditProductComponent } from './Componenets/Products/edit-product/edit-product.component';
import { EditCustomerComponent } from './Componenets/Customers/edit-customer/edit-customer.component';
import { EditOrderComponent } from './Componenets/Orders/edit-order/edit-order.component';


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    DashboardComponent,
    OrderComponent,
    CustomerComponent,
    ProductComponent,
    AboutComponent,
    AddCustomerComponent,
    AddProductComponent,
    AddOrderComponent,
    LogInComponent,
    RegisterComponent,
    EditProductComponent,
    EditCustomerComponent,
    EditOrderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule
    ,HttpClientModule
  ],
  providers: [ApiService,HttpClient,DataService,
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
