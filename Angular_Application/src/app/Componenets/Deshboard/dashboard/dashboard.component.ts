import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/Connection.service';
import { DataService } from 'src/app/services/storage.service';
import { Customer } from 'src/app/Models/customer.model';
import { Product } from 'src/app/Models/product.model';
import { Order } from 'src/app/Models/order.model';

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  Products:Product[];
  Customers:Customer[];
  Orders: Order[];
  LineChart:any;
  BarChart:any;
  logInStatus:Boolean;
  constructor(private _router:Router,private _client:ApiService,private _data:DataService) { 
    this.Products=[];
    this.Orders=[];
    this.Customers=[];
    this.logInStatus=sessionStorage.getItem("token")!=null;
    this._data.getLoginSatus().subscribe((data) => {
      this.logInStatus = data;
      this.checkForLogIn();
    });

  
  }
  
  ngOnInit() {
    this._client.getProducts().subscribe((data)=>{
      this.Products=data;
      this._client.getOrders().subscribe((data)=>{
        this.Orders=data;
        this._client.getCustomers().subscribe((data)=>{
          this.Customers=data;
          this.performPreData();
        });
      });
    });
    
    

    

  }
  checkForLogIn() {
    if (!this.logInStatus) {
      this._router.navigate(['/about']);
    }
  }
  performPreData(){
    var data1=[0,0,0,0,0,0,0,0,0,0,0,0];
    var data2=[0,0,0,0,0,0,0,0,0,0,0,0];
    for(let o of this.Orders){

      var d=new Date(o.shippedDate);
      data1[d.getMonth()]=data1[d.getMonth()]+1;
      data2[d.getMonth()]=data1[d.getMonth()]+o.amount;
    }
    this.performDataOnChart(data1,data2);
  }
  performDataOnChart(listA:any,ListB:any){
    this.LineChart = new Chart('lineChart', {
      type: 'line',
      data: {
        labels: ["Jan","Feb","Mar","Apr","May","Jun","July","Aug","Sep","Oct","Nov","Dec"],
        datasets: [{
          label: 'Number of items Sold in months',
          data: listA,
          fill: false,
          lineTension: 0.1,
          borderColor: "red",
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });

    this.BarChart = new Chart('barChart', {
      type: 'bar',
      data: {
        labels: ["Jan","Feb","Mar","Apr","May","Jun","July","Aug","Sep","Oct","Nov","Dec"],
        datasets: [{
          label: 'Amount genrated by months',
          data: ListB,
          backgroundColor: [
            'rgba(255,99,132,0.2)',
            'rgba(54,162,235,0.2)',
            'rgba(255,206,86,0.2)',
            'rgba(75,192,192,0.2)',
            'rgba(153,192,255,0.2)',
            'rgba(255,159,64,0.2)',
            'rgba(255,99,132,0.2)',
            'rgba(54,162,235,0.2)',
            'rgba(255,206,86,0.2)',
            'rgba(75,192,192,0.2)',
            'rgba(153,192,255,0.2)',
            'rgba(255,159,64,0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54,162,235,1)',
            'rgba(255,206,86,1)',
            'rgba(75,192,192,1)',
            'rgba(153,192,255,1)',
            'rgba(255,159,64,1)',
            'rgba(255,99,132,1)',
            'rgba(54,162,235,1)',
            'rgba(255,206,86,1)',
            'rgba(75,192,192,1)',
            'rgba(153,192,255,1)',
            'rgba(255,159,64,1)'
          ],
          borderWidth: 1
        }]
      }, 
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }
}
