import { Injectable, Input, Output } from '@angular/core';
import { UserRegisterDetails } from '../models/UserRegisterDetails';


@Injectable({
    // One object for the entire website
    providedIn: 'root'

})
export class StateService {
    @Output()
    isPart1Complete: boolean;
    newUser: UserRegisterDetails;

    constructor() {
        this.isPart1Complete = false;
        this.newUser = new UserRegisterDetails();
    }

    public registerStatus() {
        return this.isPart1Complete = !this.isPart1Complete;
    }

}