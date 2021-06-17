import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { CartItemsService } from 'src/app/services/CartItemsService';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.html',
  styleUrls: ['./modal.css']
})
export class ModalComponent {

  @Input()
  product: Product
  @Input()
  quantity: number;
  btnSubText: string;
  isInOrder: boolean;

  @ViewChild('myModal', { static: false }) modal: ElementRef;
  @ViewChild('myModal', { static: false }) receiptModal: ElementRef;

  constructor(private cartItemsService: CartItemsService) {
    this.product = new Product;
    this.quantity = 1;
    this.isInOrder = false;
  }
  
  ngOnInit() {
    this.intCloseModal()
  }

  addToCart(quantity: number) {
    if (this.cartItemsService.cartItemsMap.has(this.product.productID)) {
      this.updateCartItem(this.product, quantity)
      this.btnSubText = "add to cart";
    }
    else {
      let newItem = Object.assign(new Product, this.product)

      newItem.quantity = quantity;
      newItem.totalPrice = newItem.price * quantity;
      newItem.cartID = parseInt(sessionStorage.getItem("cartID"));

      let observable = this.cartItemsService.addNewItemToCart(newItem);
      observable.subscribe((response) => {
        let itemID = response;
        newItem.itemID = +itemID
        this.cartItemsService.cartItemsMap.set(newItem.productID, newItem);
        this.cartItemsService.totalPrice += newItem.totalPrice
        this.quantity = 1;

      }, error => {
        alert('Failed to add new item ' + JSON.stringify(error));
      });
    }
    this.close();
  }

  updateCartItem(item: Product, quantity: number) {
    this.product = item;
    let observable = this.cartItemsService.updateCartItem(item);
    observable.subscribe(() => {
      let cartItem = this.cartItemsService.cartItemsMap.get(item.productID);
      this.cartItemsService.totalPrice -= cartItem.totalPrice
      cartItem.quantity = quantity;
      cartItem.totalPrice = cartItem.price * quantity;
      this.cartItemsService.totalPrice += cartItem.totalPrice
      this.cartItemsService.cartItemsMap.set(cartItem.productID, cartItem);
      this.quantity = 1;

    }, (error: any) => {
      alert('Failed to update cart item ' + JSON.stringify(error));
    });
  }

  open(product: Product) {
    this.isInOrder = false;
    this.product = product;
    this.modal.nativeElement.style.display = 'block';
  }

  public modalOpen() {
    this.isInOrder = true;
    this.modal.nativeElement.style.display = 'block';
  }

  close() {
    this.btnSubText = "add to cart";
    this.modal.nativeElement.style.display = 'none';
  }

  intCloseModal() {
    this.close();
    this.quantity = 1;
  }
}