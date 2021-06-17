import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { City } from 'src/app/models/City';
import { StateService } from 'src/app/services/StateService';
import { UserService } from 'src/app/services/UserService';

@Component({
  selector: 'app-register-part2',
  templateUrl: './register-part2.component.html',
  styleUrls: ['./register-part2.component.css']
})
export class RegisterPart2Component implements OnInit {


  private usersService: UserService;
  public registerForm: FormGroup;
  public cities: Array<string>;


  constructor(public stateService: StateService, usersService: UserService, private router: Router,
    private formBuilder: FormBuilder) {
    this.usersService = usersService;
    this.cities = Object.values(City);
  }


  register(): void {
    this.stateService.registerStatus();
    this.stateService.newUser.city = this.city.value;
    this.stateService.newUser.address = this.address.value;
    this.stateService.newUser.firstName = this.firstName.value;
    this.stateService.newUser.lastName = this.lastName.value;
    console.log(this.stateService.newUser);
    const observable = this.usersService.createUser(this.stateService.newUser);
    observable.subscribe(() => {
      alert("yayy! user created succesfully");
      this.router.navigate(["/home"]);
    }, serverErrorResponse => {
      if (serverErrorResponse.status == 601) {
        this.stateService.newUser.email = null;
        alert("email already exists")
      }
      if (serverErrorResponse.status == 602) {
        this.stateService.newUser.email = null;
        alert("email not valid")
      }
      if (serverErrorResponse.status !== 601 && serverErrorResponse.status !== 602) {
        alert("Error! Status: " + serverErrorResponse.status + ", Message: " + serverErrorResponse.message);
      }
    });
  }
  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      city: ['', Validators.required],
      address: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', [Validators.required]]
    }
    )
  }
  get city() {
    return this.registerForm.get('city');
  }
  get address() {
    return this.registerForm.get('address');
  }
  get firstName() {
    return this.registerForm.get('firstName');
  }
  get lastName() {
    return this.registerForm.get('lastName');
  }

}
