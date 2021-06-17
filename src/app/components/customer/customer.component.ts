import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Category } from 'src/app/models/Category';
import { Product } from 'src/app/models/Product';
import { CartItemsService } from 'src/app/services/CartItemsService';
import { CartsService } from 'src/app/services/CartsService';
import { ProductsService } from 'src/app/services/ProductsService';
import { ModalComponent } from '../modal/modal';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  public minimise: boolean;
  public categories: Category[];
  constructor(public productsService: ProductsService, public cartItemsService: CartItemsService,
    public cartsService: CartsService) {
    this.categories = [];
    this.minimise = true;
  }

  getAllProducts() {
    let observable = this.productsService.getAllProducts();
    observable.subscribe(response => {
      this.productsService.selectedCategory = 0;
      this.productsService.products = response;
    }, error => {
      alert('Failed to get products ' + JSON.stringify(error.statusText));
    });
  }
  
  @ViewChild('modal', { static: false }) modal: ModalComponent

  openModal(product: Product) {
    let productID = product.productID
    if (this.cartItemsService.cartItemsMap.has(productID)) {
      alert("product already in cart")
      this.modal.btnSubText = "update quantity";
      return this.modal.open(this.cartItemsService.cartItemsMap.get(productID));
    }
    else {
      this.modal.open(Object.assign(new Product,product));
    }
  }

  getProductsByCategory(categoryID: number) {
    let observable = this.productsService.getAllProductsByCategory(categoryID);
    observable.subscribe(response => {
      this.productsService.selectedCategory = categoryID;
      this.productsService.products = response;
    }, error => {
      alert('Failed to get products ' + JSON.stringify(error.statusText));
    });
  }

  getAllCategories() {
    let observable = this.productsService.getAllCategories();
    observable.subscribe(response => {
      this.categories = response;
    }, error => {
      alert('Failed to get categories ' + JSON.stringify(error.statusText));
    });
  }

  ngOnInit(): void {
    this.getAllProducts();
    this.getAllCategories();
  }
}