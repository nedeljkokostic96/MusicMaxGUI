import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { StorageService } from '../services/storage.service';
import { AuthResponseData } from '../util/AuthResponseData';
import { UserClient } from '../util/UserClient';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  signUpForm:FormGroup;
  isLoading = false;
  errorMsg:string;
  constructor(private authService:AuthenticationService, private router:Router, private storageService:StorageService) { }

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      'firstName': new FormControl(null,[Validators.required] ),
      'lastName': new FormControl(null,[Validators.required] ),
      'birthDate': new FormControl(null,[Validators.required] ),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null,[Validators.required, Validators.minLength(6)] )
    });
  }

  onSubmit(){
      
    const email = this.signUpForm.get('email').value;
    const password = this.signUpForm.get('password').value;

    let authObs: Observable<AuthResponseData>;
    this.isLoading= true;

    authObs = this.authService.signup(email,password);

    authObs.subscribe(resData=>{
      console.log(resData);
      const newUser:UserClient= this.signUpForm.value;
      this.storageService.storeUser(newUser);
      this.isLoading=false;
      this.router.navigate(["/logIn"]);
    }, errorMsg=>{
      this.errorMsg = errorMsg;
      console.log(errorMsg);
      this.isLoading=false;
    })


  }
  

}
