import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenStorageService } from 'src/app/Core/service/token/tokenstoreage.service';

@Injectable({
  providedIn: 'root'
})
export class AutheticationGuard implements CanActivate {

  constructor(private tokenservice: TokenStorageService, private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

if(window.sessionStorage.getItem("login")!=null){
  console.log("inside auth")
  console.log(window.sessionStorage.getItem("login"))

  return true;
}

   else{
//alert("please login")
this.router.navigate(['/login'])

   }

    }  
}
