import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuard implements CanActivate {
  constructor(private authService:AuthenticationService, private router:Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.authService.loggedUser.pipe(take(1),map(user=>{
        console.log(user)
        const isAuth =  !!user;
        if(isAuth){
          console.log('prosao if')
          return true;
        }
        console.log('ispod propao')
        return this.router.createUrlTree(['/logIn']);
      }))
  }
  
}
