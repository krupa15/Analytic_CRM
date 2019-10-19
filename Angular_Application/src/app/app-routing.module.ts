import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { OrderComponent } from './Componenets/Orders/order/order.component';
import { CustomerComponent } from './Componenets/Customers/customer/customer.component';
import { ProductComponent } from './Componenets/Products/product/product.component';
import { DashboardComponent } from './Componenets/Deshboard/dashboard/dashboard.component';
import { AddCustomerComponent } from './Componenets/Customers/add-customer/add-customer.component';
import { AddProductComponent } from './Componenets/Products/add-product/add-product.component';
import { AddOrderComponent } from './Componenets/Orders/add-order/add-order.component';
import { AboutComponent } from './Componenets/about/about.component';
import { LogInComponent } from './Componenets/Auth/LogInPage/LogInPage.component';
import { RegisterComponent } from './Componenets/Auth/Registration/Register.component';
import { SidebarComponent } from './Componenets/sidebar/sidebar.component';
import { EditProductComponent } from './Componenets/Products/edit-product/edit-product.component';
import { EditCustomerComponent } from './Componenets/Customers/edit-customer/edit-customer.component';
import { EditOrderComponent } from './Componenets/Orders/edit-order/edit-order.component';



const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'order', component: OrderComponent },
  { path: 'customer', component: CustomerComponent },
  { path: 'product', component: ProductComponent },
  { path: 'about', component: AboutComponent },
  { path: 'addCustomer', component: AddCustomerComponent },
  { path: 'addProduct', component: AddProductComponent },
  { path: 'addOrder', component: AddOrderComponent },
  { path: 'login', component: LogInComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'sidebar', component: SidebarComponent },
  { path: 'editProduct', component: EditProductComponent },
  { path: 'editCustomer', component: EditCustomerComponent },
  { path: 'editOrder', component: EditOrderComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
