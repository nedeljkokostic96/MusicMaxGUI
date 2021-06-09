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

  signup(email:string, password:string, fname:string, lname:string, birthDate:Date){
    return  this.http.post<AuthResponseData>
    ('http://localhost:8080/MusicMax/api/auth/signup',
    {
      'email': email,
      'password': password,
      'firstName': fname,
      'lastName': lname,
      'birthDate' :birthDate,
      'role' : 'user'
     
    }
    
    ).pipe(tap(resData=>{
      console.log(resData)
    }) )
  }


  emailTemp:string;
  login(email: string, password: string) {
    this.emailTemp = email;

    return this.http.post
    ('http://localhost:8080/MusicMax/api/auth/signin',
      {
        'email': email,
        'password': password,
      
      }
    )
    .pipe(catchError(this.handleError),
      tap((resData:any) => {
        this.handleAuthentication(resData.accessToken, this.emailTemp);

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
    const loadedUser = new UserLogIn(userData.email, userData._token, new Date(userData._tokenExpirationDate));
    if (loadedUser.token) {
      this.loggedUser.next(loadedUser);
      const expDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expDuration);
      this.router.navigate(["/home"])
    }
  }

  private handleAuthentication(accessToken:string, email:string){
    const expDate = new Date(new Date().getTime() + 3600 * 1000);
    const user = new UserLogIn( email, accessToken, expDate);
    this.loggedUser.next(user);
    this.autoLogout(3600 * 1000);
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
