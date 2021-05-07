import { transition, trigger, useAnimation } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {wobble,jello,bounceIn} from 'ng-animate';
import { Observable } from 'rxjs';
import { AuthResponseData } from 'src/app/model/AuthResponseData';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css'],
  animations: [
    trigger('wobble', [transition('normal => error', useAnimation(jello, {
      params: { timing: 1, delay: 0 }
    }))])
  ],
})
export class LogInComponent implements OnInit {
  successReg:boolean;
  logInForm:FormGroup;
  isLoading:boolean;
  currentState = 'normal';
  errorMsg:string;
  constructor(private route:ActivatedRoute,private authService:AuthenticationService,private router:Router) { }

  ngOnInit(): void {
    this.isLoading = false;
    this.currentState = 'normal';
    this.route.queryParams.subscribe(params=>{
        this.successReg = params['succes'] || false;
    });
    this.logInForm = new FormGroup({
      'email': new FormControl(null, {validators:[Validators.required, Validators.email],  updateOn: 'blur'}),
      'password': new FormControl(null,[Validators.required, Validators.minLength(6)] )
    });
    
    this.logInForm.statusChanges.subscribe(value=>{
      console.log(value);
      this.currentState = ((this.logInForm.get('email').hasError('required') || this.logInForm.get('email').hasError('email')  ) && 
                        (this.logInForm.get('email').dirty ||this.logInForm.get('email').touched  ) && !this.logInForm.get('email').pending ) ? 'error': 'normal';
      console.log(this.currentState);
    })
  }

  onSubmit(){
    const email = this.logInForm.get('email').value;
    const password = this.logInForm.get('password').value;

    let authObs: Observable<AuthResponseData>;
    this.isLoading= true;

    authObs = this.authService.login(email,password);

    authObs.subscribe(resData=>{
      console.log(resData);
      this.isLoading = false;
      this.router.navigate(['home']);
    }, errorMsg=>{
      console.log(errorMsg);
      this.errorMsg = errorMsg;
      this.isLoading = false;
    })
  }



}
