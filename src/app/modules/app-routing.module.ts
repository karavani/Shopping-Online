import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from '../components/admin/admin.component';
import { CustomerComponent } from '../components/customer/customer.component';
import { MainComponent } from '../components/main/main.component';
import { RegisterComponent } from '../components/register/register.component';
import { AdminGuard } from '../guards/admin.guard';
import { CustomerGuard } from '../guards/customer.guard copy';

const routes: Routes = [{ path: "home", component: MainComponent },
{ path: "home", component: MainComponent },
{ path: "register", component: RegisterComponent },
{ path: "login", component: MainComponent },
{ path: "customer", canActivate: [CustomerGuard], component: CustomerComponent },
{ path: "admin", canActivate: [AdminGuard], component: AdminComponent},
{ path: "", redirectTo: "home", pathMatch: "full" }, // pathMatch = התאמת המחרוזת הריקה לכלל הנתיב
  // { path: "**", component: Page404Component } // Page not Found (Must be the last one!!!)
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
