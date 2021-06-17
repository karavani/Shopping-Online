import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/Product';



@Injectable({
    // One object for the entire website
    providedIn: 'root'
})
export class CartItemsService {

    public totalPrice: number;
    public cartItemsMap: Map<number, Product>;
    constructor(private http: HttpClient) {
        this.cartItemsMap = new Map();
        this.totalPrice = 0;
    }
    public getCartItems(cartID: number): Observable<Product[]> {
        return this.http.get<Product[]>("https://shopping-online-noam.herokuapp.com/cart-items/" + cartID);
    }
    public addNewItemToCart(product: Product): Observable<Product> {
        return this.http.post<Product>("https://shopping-online-noam.herokuapp.com/cart-items/", product);
    }
    public deleteItemFromCart(itemID: number)  {
        return this.http.delete("https://shopping-online-noam.herokuapp.com/cart-items/"+itemID);
    }
    public updateCartItem(item: Product): Observable<Product> {
        return this.http.put<Product>("https://shopping-online-noam.herokuapp.com/cart-items/", item);
    }
}