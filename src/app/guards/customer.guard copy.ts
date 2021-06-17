import { Injectable, ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class CustomerGuard implements CanActivate {

    public constructor(private router: Router) { }

    public canActivate(): boolean {
        const isLoggedIn = sessionStorage.getItem("isLoggedIn");
        const userType = sessionStorage.getItem("userType");
        // const userHasCart = sessionStorage.getItem("cartID");
        if (isLoggedIn == "true" && userType == "customer") {
            return true;
        }
        if (isLoggedIn == "true" && userType == "admin") {
            this.router.navigateByUrl("/admin");
            return false;
        }
        this.router.navigateByUrl("/login");
        alert("Access Denied");
        return false;
    }

}
