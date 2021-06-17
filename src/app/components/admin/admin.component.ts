import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { ProductsService } from 'src/app/services/ProductsService';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(public productsService: ProductsService) {
  }

  ngOnInit(): void {
    this.getAllProducts();
    this.getAllCategories();
  }
  getProductsByCategory(categoryID: number) {
    let observable = this.productsService.getAllProductsByCategory(categoryID);
    observable.subscribe(response => {
      this.productsService.selectedCategory = categoryID;
      this.productsService.products = response;
    }, error => {
      alert('Failed to get products ' + JSON.stringify(error));
    });
  }
  getAllCategories() {
    let observable = this.productsService.getAllCategories();
    observable.subscribe(response => {
      this.productsService.categories = response;
    }, error => {
      alert('Failed to get categories ' + JSON.stringify(error));
    });
  }
  updateProduct(product: Product) {
    this.productsService.isManagedMod = true;
    this.productsService.product = Object.assign(new Product, product);
  }
  getAllProducts() {
    let observable = this.productsService.getAllProducts();
    observable.subscribe(response => {
      this.productsService.selectedCategory = 0;
      this.productsService.products = response;
    }, error => {
      alert('Failed to get products ' + JSON.stringify(error));
    });
  }
}
