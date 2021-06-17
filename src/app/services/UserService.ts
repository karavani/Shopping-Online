import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SuccessfulLoginServerResponse } from '../models/SuccessfulLoginServerResponse';
import { UserLoginDetails } from '../models/UserLoginDetails';
import { UserRegisterDetails } from '../models/UserRegisterDetails';


@Injectable({
    // One object for the entire website
    providedIn: 'root'
})
export class UserService {
    public userName: string;
    public userType: string;
    // HttpClient injection (a class variable will be automatically created)
    constructor(private http: HttpClient) {
        // this.http = http;
        this.userName = '';
    }

    public login(userLoginDetails: UserLoginDetails): Observable<SuccessfulLoginServerResponse> {

        //  The http request will be sent after the subscribe() method will be called
        return this.http.post<SuccessfulLoginServerResponse>("https://shopping-online-noam.herokuapp.com/users/login", userLoginDetails);
    }

    public createUser(UserRegisterDetails: UserRegisterDetails): Observable<SuccessfulLoginServerResponse> {
        return this.http.post<SuccessfulLoginServerResponse>("https://shopping-online-noam.herokuapp.com/users", UserRegisterDetails);
    }

    public getCustomerCityAddress() {
        return this.http.get("https://shopping-online-noam.herokuapp.com/users/city");
    }
    public getCustomerStreetAddress() {
        return this.http.get("https://shopping-online-noam.herokuapp.com/users/street");
    }

}
