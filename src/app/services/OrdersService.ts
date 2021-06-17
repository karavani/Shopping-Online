import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OrderDetails } from '../models/OrderDetails';



@Injectable({
    // One object for the entire website
    providedIn: 'root'
})
export class OrdersService {

    constructor(private http: HttpClient) {
    }
    public getAllOrdersNumber() {
        return this.http.get("https://shopping-online-noam.herokuapp.com/orders/number");
    }
    public getOrdersBusyDays() {
        return this.http.get("https://shopping-online-noam.herokuapp.com/orders");
    }
    public addNewOrder(order: OrderDetails){
        return this.http.post("https://shopping-online-noam.herokuapp.com/orders", order);

    }

}