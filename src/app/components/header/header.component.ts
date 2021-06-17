import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { ProductsService } from 'src/app/services/ProductsService';
import { UserService } from 'src/app/services/UserService';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public searchText: string
  public isMobile: boolean
  constructor(public usersService: UserService, private productsService: ProductsService) {
    this.isMobile = false;
    this.searchText = "";
  }

  @ViewChild('myInput', { static: false }) input: ElementRef;

  ngOnInit(): void {
    if (sessionStorage.getItem("userName")) {
      this.usersService.userName = sessionStorage.getItem("userName");
    }
  }
  
  logout() {
    sessionStorage.clear();
  }

  search() {
    if (sessionStorage.getItem("isLoggedIn")) {
      this.productsService.selectedCategory = 999;
      let observable = this.productsService.getProductByName(this.searchText);
      observable.subscribe((response) => {
        this.productsService.products = response;
        this.searchText = "";
        this.input.nativeElement.focus();
      }, error => {
        alert('Failed to get products ' + JSON.stringify(error.statusText));
      });
    }
    else {
      this.searchText = "";
      alert("You need to log in first..")
    }
  }

}
