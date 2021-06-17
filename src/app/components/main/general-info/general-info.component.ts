import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/services/OrdersService';
import { ProductsService } from 'src/app/services/ProductsService';

@Component({
  selector: 'app-general-info',
  templateUrl: './general-info.component.html',
  styleUrls: ['./general-info.component.css']
})
export class GeneralInfoComponent implements OnInit {
  public productsNumber: number;
  public ordersNumber: number;

  constructor(private productsService: ProductsService, private ordersService: OrdersService) {
    this.productsNumber = 0;
    this.ordersNumber = 0;

  }

  ngOnInit(): void {
    
    let observable = this.productsService.getAllProductsNumber();
    observable.subscribe(response => {
      this.productsNumber = response[0].productsNumber;
    }, error => {
      alert('Failed to get products number ' + JSON.stringify(error));
    });

    observable = this.ordersService.getAllOrdersNumber();
    observable.subscribe(response => {
      this.ordersNumber = response[0].ordersNumber;
    }, error => {
      alert('Failed to get orders number ' + JSON.stringify(error));
    });
  }

}
