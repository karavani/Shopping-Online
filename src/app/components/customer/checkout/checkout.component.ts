import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, ValidatorFn, AbstractControl } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { City } from 'src/app/models/City';
import { OrderDetails } from 'src/app/models/OrderDetails';
import { CartItemsService } from 'src/app/services/CartItemsService';
import { CartsService } from 'src/app/services/CartsService';
import { OrdersService } from 'src/app/services/OrdersService';
import { UserService } from 'src/app/services/UserService';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {


  public orderFormGroup: FormGroup;
  public url: SafeUrl;
  minDate = new Date(Date.now());
  public cities: Array<string>;
  public myBusyDays: any[]

  constructor(private formBuilder: FormBuilder,
    private ordersService: OrdersService,
    private cartsService: CartsService,
    private userService: UserService,
    private breakpointObserver: BreakpointObserver,
    private cartItemsService: CartItemsService,
    private sanitizer: DomSanitizer,
    private router: Router) {
    this.cities = Object.values(City);
    this.url = null;
    this.myBusyDays = []

  }
  @ViewChild('myModal', { static: false }) modal: ElementRef;


  ngOnInit(): void {
    this.getOrdersBusyDays();
    this.orderFormGroup = this.formBuilder.group({
      city: ['', Validators.required],
      street: ['', Validators.required],
      deliveryDate: ['', [Validators.required, this.weekendValidator(), this.busyDaysValidator()]],
      creditCard: ['', [Validators.required, Validators.pattern("^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$")]]
    })
  }

  onDblGetCity() {
    let observable = this.userService.getCustomerCityAddress();
    observable.subscribe((response: string) => {
      this.orderFormGroup.get("city").setValue(response);
    }, error => {
      alert('Failed to get products ' + JSON.stringify(error));
    });
  }

  onDblGetStreet() {
    let observable = this.userService.getCustomerStreetAddress();
    observable.subscribe(response => {
      this.orderFormGroup.get("street").setValue(response);
    }, error => {
      alert('Failed to get products ' + JSON.stringify(error));
    });
  }

  receieptContent() {
    let payment4LastDigits = this.creditCard.value.toString().slice(-4).toString();
    let string = this.city.value + "\n" +
      this.street.value +
      "\n  " + this.deliveryDate.value + "\n" + "------------------------------------------------\n" +
      "\n \n";
    this.cartItemsService.cartItemsMap.forEach(item => {
      string += item.productName + "\tx" + item.quantity + "\t" + item.totalPrice + "₪ \n"
    });
    string += "\n" + "---------------------------------------------------\n" +
      "\n 💳 " + payment4LastDigits + "  ****  ****  ****" + "\n" + "\n" + "total price: " + this.cartItemsService.totalPrice + "₪"
    return string;
  }

  getOrdersBusyDays() {
    let observable = this.ordersService.getOrdersBusyDays();
    observable.subscribe((response: any) => {
      response.forEach((index: any) => {
        this.myBusyDays.push(new Date(index.dateToDeliver));
      });
    }, error => {
      alert('Failed to get products ' + JSON.stringify(error));
    });
  }

  close() {
    this.cartsService.isInOrder = !this.cartsService.isInOrder;
    this.router.navigate(["/home"]);
    this.modal.nativeElement.style.display = 'none';
  }

  order() {
    let deliveryDate = this.deliveryDate.value;
    const blob = new Blob([this.receieptContent()], { type: 'text/plain' });
    this.url = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(blob));
    let payment4LastDigits = this.creditCard.value.toString().slice(-4);
    let order = new OrderDetails(parseInt(sessionStorage.getItem("cartID")), this.cartItemsService.totalPrice,
      this.city.value, this.street.value, new Date(deliveryDate.getTime() - deliveryDate.getTimezoneOffset() * 60000), payment4LastDigits);
    let observable = this.ordersService.addNewOrder(order)
    observable.subscribe(() => {
      this.modal.nativeElement.style.display = 'block';
      this.initCart();
    }, error => {
      alert('Failed to make order ' + JSON.stringify(error));
      console.log(error);
    });
  }

  initCart() {
    let observable = this.cartsService.creatNewCart();
    observable.subscribe((response: number) => {
      sessionStorage.removeItem("cartID");
      this.cartItemsService.cartItemsMap = new Map();
      this.cartsService.cartID = response;
      this.cartItemsService.totalPrice = 0;
      sessionStorage.setItem("cartID", response.toString());
    })

  }

  get city() {
    return this.orderFormGroup.get('city');
  }
  get street() {
    return this.orderFormGroup.get('street');
  }
  get deliveryDate() {
    return this.orderFormGroup.get('deliveryDate');
  }
  get creditCard() {
    return this.orderFormGroup.get('creditCard');
  }
  get isMobile() {
    return this.breakpointObserver.isMatched('(max-width: 767px)');
  }

  busyDaysFilter = (d: Date): boolean => {
    const time = d.getTime();
    const day = (d || new Date()).getDay();
    // Prevent Saturday, Friday and busy days from being selected.
    return !this.myBusyDays.find(x => x.getTime() == time) && day !== 5 && day !== 6;
  }

  busyDaysValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      let forbidden = true;
      if (control.value) {
        if (!this.myBusyDays.find(x => x.getTime() == control.value)) {
          forbidden = false;
        }
      }
      return forbidden ? { 'busyDays': true } : null;
    };

  }

  weekendValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      let forbidden = true;
      if (control.value) {
        const day = control.value.getDay();
        if (day !== 5 && day !== 6) {
          forbidden = false;
        }
      }
      return forbidden ? { 'weekend': true } : null;
    };

  }
}
