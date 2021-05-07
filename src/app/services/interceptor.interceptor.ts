import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpParams
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { take, exhaustMap } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class InterceptorInterceptor implements HttpInterceptor {

  constructor(private authService:AuthenticationService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.authService.loggedUser.pipe(take(1),
    exhaustMap(user => {
      if(!user)
        return next.handle(request);
      const  modifiedReq = request.clone({
        params: new HttpParams().set('auth', user.token)
      })
      return next.handle(modifiedReq);
    })
  )
  }
}
