import { trigger, transition, useAnimation } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { jello } from 'ng-animate';
import { Observable } from 'rxjs';
import { AuthResponseData } from 'src/app/model/AuthResponseData';
import { UserRegisterClient } from 'src/app/model/UserRegisterClient';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { StorageService } from 'src/app/services/storage.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  animations: [
    trigger('wobble', [transition('normal => error', useAnimation(jello, {
      params: { timing: 1, delay: 0 }
    }))])
  ],
})
export class RegisterComponent implements OnInit {
  matcher:MyErrorStateMatcher;
  signUpForm:FormGroup;
  isLoading:boolean = false;
  
  errorMsg:string;
  
  minDate: Date;
  maxDate: Date;

  currentState:string;
  currentStateFname:string;
  currentStateLname:string;
  currentStatePassword:string;

  constructor(private authService:AuthenticationService, private router:Router, private storageService:StorageService) { }

  ngOnInit(): void {
    this.matcher = new  MyErrorStateMatcher();

    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 90, 0, 1);
    this.maxDate = new Date(currentYear - 18, 0, 0);

    this.isLoading = false;
    this.signUpForm = new FormGroup({
      'firstName': new FormControl(null,{validators:[Validators.required,Validators.pattern('^[a-zA-Z \-\']+')],  updateOn: 'blur'} ),
      'lastName': new FormControl(null,{validators:[Validators.required,Validators.pattern('^[a-zA-Z \-\']+')],  updateOn: 'blur'} ),
      'birthDate': new FormControl(null,[Validators.required] ),
      'email': new FormControl(null, {validators:[Validators.required, Validators.email],  updateOn: 'blur'}),
      'password': new FormControl(null,{validators:[Validators.required, Validators.minLength(6)] } )
    });
    this.currentState = 'normal';
    this.currentStateFname = 'normal';
    this.currentStateLname = 'normal';
    this.currentStatePassword = 'normal';

    this.signUpForm.get('email').statusChanges.subscribe(value=>{
      this.currentState = (this.signUpForm.get('email').hasError('required') || this.signUpForm.get('email').hasError('email')  && (this.signUpForm.get('email').touched || this.signUpForm.get('email').dirty ) )? 'error': 'normal' || 'normal';
    })
    this.signUpForm.get('firstName').statusChanges.subscribe(value=>{
      this.currentStateFname = (this.signUpForm.get('firstName').hasError('required') || this.signUpForm.get('firstName').hasError('pattern') && (this.signUpForm.get('firstName').touched || this.signUpForm.get('firstName').dirty ) ) ? 'error': 'normal';  
    })
    this.signUpForm.get('lastName').statusChanges.subscribe(value=>{
      this.currentStateLname = (this.signUpForm.get('lastName').hasError('required') || this.signUpForm.get('lastName').hasError('pattern')  && (this.signUpForm.get('lastName').touched || this.signUpForm.get('lastName').dirty ) ) ? 'error': 'normal'; 
    })  
    this.signUpForm.get('password').statusChanges.subscribe(value=>{  
      this.currentStatePassword = (this.signUpForm.get('password').hasError('required') || this.signUpForm.get('password').invalid  && (this.signUpForm.get('password').touched || this.signUpForm.get('password').dirty ) ) ? 'error': 'normal'; 
    }) 

  }
  onSubmit(){
    const email = this.signUpForm.get('email').value;
    const password = this.signUpForm.get('password').value;
    
    let authObs: Observable<AuthResponseData>;
    this.isLoading= true;

    authObs = this.authService.signup(email,password);

    authObs.subscribe(resData=>{
      console.log(resData);
      const newUser:UserRegisterClient= this.signUpForm.value;
      this.storageService.storeUser(newUser).subscribe(result=>{});
      this.isLoading=false;
      console.log("ovde sam")
      this.router.navigate(["/login"],{queryParams:{succes:'true'}});
    }, errorMsg=>{
      this.errorMsg = errorMsg;
      console.log(errorMsg);
      this.isLoading=false;
    })
  }
}
