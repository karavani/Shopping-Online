import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { LayoutComponent } from '../components/layout/layout.component';
import { MainComponent } from '../components/main/main.component';
import { HeaderComponent } from '../components/header/header.component';
import { CartComponent } from '../components/customer/cart/cart.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoginComponent } from '../components/main/login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AboutComponent } from '../components/main/about/about.component';
import { GeneralInfoComponent } from '../components/main/general-info/general-info.component';
import { RegisterComponent } from '../components/register/register.component';
import { RegisterPart1Component } from '../components/register/register-part1/register-part1.component';
import { RegisterPart2Component } from '../components/register/register-part2/register-part2.component';
import { CustomerComponent } from '../components/customer/customer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthenticationInterceptor } from '../interceptors/AuthenticationInterceptor';
import { ProductsService } from '../services/ProductsService';
import { UserService } from '../services/UserService';
import { ProductCardComponent } from '../components/product-card/product-card.component';
import { ModalComponent } from '../components/modal/modal';
import { CheckoutComponent } from '../components/customer/checkout/checkout.component';

import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { AdminComponent } from '../components/admin/admin.component';
import { ProductManagementComponent } from '../components/product-management/product-management.component';
import { ProductsPipeByCategory } from '../pipes/ProductsPipeByCategory';

@NgModule({
  declarations: [
    LayoutComponent,
    MainComponent,
    HeaderComponent,
    CartComponent,
    LoginComponent,
    AboutComponent,
    AdminComponent,
    GeneralInfoComponent,
    RegisterComponent,
    RegisterPart1Component,
    RegisterPart2Component,
    CustomerComponent,
    ProductCardComponent,
    ModalComponent,
    CheckoutComponent,
    ProductManagementComponent,
    ProductsPipeByCategory,
  ],
  imports: [
    BrowserModule,
    FormsModule, ReactiveFormsModule,
    AppRoutingModule, RouterModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatProgressBarModule
  ],
  providers: [UserService
    , ProductsService
    , { provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true }
  ],
  bootstrap: [LayoutComponent]
})
export class AppModule { }
