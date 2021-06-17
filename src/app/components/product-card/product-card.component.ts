import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CartsService } from 'src/app/services/CartsService';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  @Input()
  status: boolean = false;
  @Input()
  productID: number;
  @Input()
  productName: string;
  @Input()
  categoryID: number;
  @Input()
  price: number;
  @Input()
  imageURL: string;
  @Input()
  btnValue: string;
  @Input()
  quantity: string;
  @Input()
  iClassName: string;
  // The event name the parent should hook to
  @Output() childEvent = new EventEmitter<string>();

  myClick() {
    // Sending the event to the parent
    this.childEvent.emit("Some string value from child to parent");
  }

  constructor(public cartsService: CartsService) { }

  ngOnInit(): void {
  }

}
