import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { UserLogIn } from '../util/UserLogIn';
import { AuthResponseData } from '../util/AuthResponseData';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  user = new BehaviorSubject<UserLogIn>(null);
  private tokenExpirationTimer: any;


  constructor(private http: HttpClient,private router:Router) { }


  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      console.log("NADA")
      return;
    }
    console.log("NADA")
    const loadedUser = new UserLogIn(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));
    console.log(loadedUser.token)
    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expDuration);
      this.router.navigate(["/landing"])
    }
  }

  autoLogout(expiratonDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expiratonDuration)
  }

  logout() {
    this.user.next(null);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
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

  private handleAuthentication(email:string, userId:string, token:string, expiresIn:number){
    const expDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new UserLogIn(email, userId, token, expDate);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }


  private handleError(errorRes: HttpErrorResponse) {
    let errorMsg = "Double check your email and password!";
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
