import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';
import { StorageService } from '../services/storage.service';
import { AuthResponseData } from '../util/AuthResponseData';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit,OnDestroy {
  logInForm: FormGroup;
  errorMsg: string;
  successfullyRegistered$:Subscription;
  successfullyRegistered:boolean;
  isLoading:boolean = false;

  constructor(private router:Router,private authService: AuthenticationService, private storageService:StorageService) { }

  ngOnDestroy(): void {
    this
  }

  ngOnInit(): void {
    this.authService.autoLogin();
    this.successfullyRegistered = false;
    this.logInForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null,[Validators.required, Validators.minLength(6)] )
    })
   this.successfullyRegistered$ =  this.storageService.successfullyRegistered.subscribe(data=>{
      this.successfullyRegistered =data;
    })
  }

  routeRegister(){
    this.router.navigate(["/register"]);
  }
  onSubmit() {

    const email = this.logInForm.get('email').value;
    const password = this.logInForm.get('password').value;

    let authObs: Observable<AuthResponseData>;
    this.isLoading= true;

    authObs = this.authService.login(email,password);

    authObs.subscribe(resData=>{
      console.log(resData);
      this.isLoading = false;
      this.router.navigate(['/landing'])
    }, errorMsg=>{
      console.log(errorMsg);
      this.errorMsg = errorMsg;
      this.isLoading = false;
    })

  }

}
