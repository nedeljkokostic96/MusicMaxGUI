import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { UserClient } from '../util/UserClient';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  successfullyRegistered =  new Subject<boolean>();

  constructor(private http:HttpClient) { }

  fetchUsers(){
    
    return this.http.get<UserClient[]>('https://musicmax-4ea40-default-rtdb.europe-west1.firebasedatabase.app/clientUsers.json');
  }

  storeUser(user:UserClient){
    this.http.put('https://musicmax-4ea40-default-rtdb.europe-west1.firebasedatabase.app/clientUsers.json',user)
    .subscribe(response=>{this.successfullyRegistered.next(true)})
  }
}
