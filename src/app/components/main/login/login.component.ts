import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UserLoginDetails } from 'src/app/models/UserLoginDetails';
import { CartsService } from 'src/app/services/CartsService';
import { UserService } from 'src/app/services/UserService';
import { BreakpointObserver } from '@angular/cdk/layout';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


    loginForm: FormGroup;
    minDate = new Date(Date.now())
    success = false;
    hide = true;

    public userLoginDetails: UserLoginDetails;
    private usersService: UserService;

    private cartsService: CartsService;
    public openCartMessage: string;
    public startShoppingButtonValue: string;
    public isUserLoggedIn: boolean;
    public userFirstName: string;

    constructor(usersService: UserService, private router: Router, cartsService: CartsService
        , private formBuilder: FormBuilder, private breakpointObserver: BreakpointObserver) {
        this.userLoginDetails = new UserLoginDetails();
        this.usersService = usersService;
        this.cartsService = cartsService;
        this.openCartMessage = "";
        this.startShoppingButtonValue = "";
        this.isUserLoggedIn = false;
    }

    public login(): void {

        this.userLoginDetails.email = this.userName.value;
        this.userLoginDetails.password = this.password.value;

        // Creating an observable object
        // It looks like an http request had been issued BUT IT DIDN'T
        const observable = this.usersService.login(this.userLoginDetails);

        // The method subscribe() ussues an http request to the server
        // successfulServerRequestData
        observable.subscribe(successfulServerRequestData => {
            this.success = true;
            sessionStorage.setItem("token", successfulServerRequestData.token + "");
            this.usersService.userType = successfulServerRequestData.userType;
            sessionStorage.setItem("userType", successfulServerRequestData.userType);
            sessionStorage.setItem("isLoggedIn", "true");
            if (successfulServerRequestData.userType == "customer") {
                this.isUserLoggedIn = true;
                sessionStorage.setItem("userName", successfulServerRequestData.name);
                this.usersService.userName = successfulServerRequestData.name;
                if (successfulServerRequestData.cart[0] == null) {
                    this.openCartMessage = "welcome " + successfulServerRequestData.name + "!";
                    this.startShoppingButtonValue = "start shopping";
                    sessionStorage.setItem("lastOpenCartDate", this.openCartMessage);
                    return
                }
                if (successfulServerRequestData.cart[0].status != 1) {
                    this.openCartMessage = "you have an open cart from date: " + successfulServerRequestData.cart[0].dateOfCreation;
                    this.startShoppingButtonValue = "resume shopping";
                    this.cartsService.cartID = successfulServerRequestData.cart[0].cartID;
                    sessionStorage.setItem("cartID", successfulServerRequestData.cart[0].cartID.toString());
                    sessionStorage.setItem("lastOpenCartDate", this.openCartMessage);
                    return
                }
                else {
                    this.openCartMessage = "your last purchase was in: " + successfulServerRequestData.cart[0].dateOfCreation;
                    this.startShoppingButtonValue = "start shopping";
                    sessionStorage.setItem("lastOpenCartDate", this.openCartMessage);
                    return
                }
            }

            if (successfulServerRequestData.userType == "admin") {
                sessionStorage.setItem("userName", "Admin");
                this.usersService.userName = "Admin";
                return this.router.navigate(["/admin"]);
            }


        }, serverErrorResponse => { // Reaching here means that the server had failed
            // serverErrorResponse is the object returned from the ExceptionsHandler
            console.log(serverErrorResponse);
            if (serverErrorResponse.status == 401) {
                alert("Error! Message: " + serverErrorResponse.statusText +
                    " user email or password are inccorect");
            }
            else {
                alert("Error! Message: " + serverErrorResponse.statusText)
            }
        });
    }

    public getCartStatus() {
        if (sessionStorage.getItem("isLoggedIn") == "true" && sessionStorage.getItem("userType") == "customer") {
            let observable = this.cartsService.getCartStatus()
            observable.subscribe(response => {
                console.log(response);
                if (response[0].status == 1) {
                    this.openCartMessage = "your last purchase was in date: " + response[0].dateOfCreation;
                    sessionStorage.setItem("lastOpenCartDate", this.openCartMessage);
                }
                if (response[0].status == 0) {
                    this.openCartMessage = "you have an open cart from date: " + response[0].dateOfCreation;
                    sessionStorage.setItem("lastOpenCartDate", this.openCartMessage);
                }
            }, error => {
                alert('Failed to get products ' + JSON.stringify(error));
            });
        }
    }

    public startShopping() {
        if (this.startShoppingButtonValue == "start shopping") {
            let observable = this.cartsService.creatNewCart();
            observable.subscribe(response => {
                this.cartsService.cartID = response;
                sessionStorage.setItem("cartID", response.toString());
            }, error => {
                alert('Failed to get products ' + JSON.stringify(error));
            });
        }
        if (sessionStorage.getItem("userType") == "customer") {
            this.router.navigate(["/customer"]);
        }
        else {
            this.router.navigate(["/admin"]);
        }
    }

    ngOnInit() {
        this.getCartStatus();
        if (sessionStorage.getItem("userType") == "customer" && sessionStorage.getItem("token")) {
            this.success = true;
            this.isUserLoggedIn = true;
            this.startShoppingButtonValue = "resume shopping";
            this.usersService.userName = sessionStorage.getItem("userName");
        }
        if (sessionStorage.getItem("lastOpenCartDate")) {
            this.openCartMessage = sessionStorage.getItem("lastOpenCartDate");
        }
        if (sessionStorage.getItem("userType") == "admin" && sessionStorage.getItem("token")) {
            this.success = true;
            this.isUserLoggedIn = true;
            this.startShoppingButtonValue = "Go ahead!";
        }
        this.loginForm = this.formBuilder.group({
            userName: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
    }

    get userName() {
        return this.loginForm.get('userName');
    }
    get password() {
        return this.loginForm.get('password');
    }
    get isMobile() {
        return this.breakpointObserver.isMatched('(max-width: 767px)');
    }
}
