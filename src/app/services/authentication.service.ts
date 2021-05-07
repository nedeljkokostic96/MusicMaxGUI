import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';


import { Router } from '@angular/router';
import { UserLogIn } from '../model/UserLogIn';
import { AuthResponseData } from '../model/AuthResponseData';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  loggedUser = new BehaviorSubject<UserLogIn>(null);
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient,private router:Router) { }

  signup(email:string, password:string){
    return  this.http.post<AuthResponseData>
    ('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDNTYmlMH9TuDKfDUfYXvrzBdjjxh030Bs',
    {
      email: email,
      password: password,
      returnSecureToken: true 
    }
    
    ).pipe(catchError(this.handleError))
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>
    ('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDNTYmlMH9TuDKfDUfYXvrzBdjjxh030Bs',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(catchError(this.handleError),
      tap(resData => {
        this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);

      }))
  }

  logout() {
    this.loggedUser.next(null);
    localStorage.removeItem('loggedUserData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
    this.router.navigate(['']);
  }
  autoLogout(expiratonDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      console.log('autologgin out');
      this.logout();
    }, expiratonDuration)
  }

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('loggedUserData'));
    if (!userData) {
      return;
    }
    const loadedUser = new UserLogIn(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));
    if (loadedUser.token) {
      this.loggedUser.next(loadedUser);
      const expDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expDuration);
      this.router.navigate(["/home"])
    }
  }

  private handleAuthentication(email:string, userId:string, token:string, expiresIn:number){
    const expDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new UserLogIn(email, userId, token, expDate);
    this.loggedUser.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('loggedUserData', JSON.stringify(user));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMsg = "Something went wrong, double check your credentials!";
    if (!errorRes.error || !errorRes.error.error)
      return throwError(errorMsg);
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMsg = 'This email exists already!';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMsg = "Uhmm we can't find that email address.."
        break;
      case 'INVALID_PASSWORD':
        errorMsg = "That password you entered is invalid!"
        break;
    }
    return throwError(errorMsg);
  }
}
