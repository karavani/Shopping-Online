import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/Category';
import { Product } from '../models/Product';



@Injectable({
    // One object for the entire website
    providedIn: 'root'
})
export class ProductsService {
    public products: Product[];
    public product: Product;
    public categories: Category[];
    public selectedCategory: number;
    public isManagedMod: boolean;
    constructor(private http: HttpClient) {
        this.selectedCategory = 0;
        this.products = [];
        this.categories = [];
        this.product = new Product();
        this.isManagedMod
    }
    public getAllCategories(): Observable<Category[]> {
        return this.http.get<Category[]>("http://130.61.25.193:3000/products/categories");
    }
    public getAllProducts(): Observable<Product[]> {
        return this.http.get<Product[]>("https://shopping-online-noam.herokuapp.com/products");
    }
    public getAllProductsByCategory(categoryID: number): Observable<Product[]> {
        return this.http.get<Product[]>("https://shopping-online-noam.herokuapp.com/products/categories/" + categoryID);
    }
    public getProductByName(searchText: string) {
        return this.http.get<Product[]>("https://shopping-online-noam.herokuapp.com/products/" + searchText);
    }
    public getAllProductsNumber() {
        return this.http.get("https://shopping-online-noam.herokuapp.com/products/number");
    }
    public addNewProduct(product: Product) {
        return this.http.post("https://shopping-online-noam.herokuapp.com/products/", product);
    }
    public updateProduct(product: Product) {
        return this.http.put("https://shopping-online-noam.herokuapp.com/products/", product);
    }
}
