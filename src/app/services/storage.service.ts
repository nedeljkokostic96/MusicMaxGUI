import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Fact } from '../model/Fact';
import { UserRegisterClient } from '../model/UserRegisterClient';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  
  constructor(private http:HttpClient) { }

  fetchUsers(){
    return this.http
    .get<UserRegisterClient>('https://musicmax-4ea40-default-rtdb.europe-west1.firebasedatabase.app/clientUsers.json');
  }

  storeUser(user:UserRegisterClient){
    return this.http.put('https://musicmax-4ea40-default-rtdb.europe-west1.firebasedatabase.app/clientUsers.json',user);
  }

  //----------------Facts Simulation--------------------//
  factsChanged = new Subject<boolean>();
  facts:Fact[]=[{id:1,title:'Very Intresting Title',content:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry-+s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.', imgURL:'/assets/dj1.jpg'},
                {id:2,title:'Very Intresting Title',content:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry-+s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.', imgURL:'/assets/dj2.jpg'},
                {id:3,title:'Very Intresting Title',content:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry-+s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.', imgURL:'/assets/dj3.jpg'},
                {id:4,title:'Very Intresting Title',content:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry-+s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.', imgURL:'/assets/dj4.jpg'},
                {id:5,title:'Very Intresting Title',content:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry-+s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.', imgURL:'/assets/dj5.jpg'},
                {id:6,title:'Very Intresting Title',content:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry-+s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.', imgURL:'/assets/dj6.jpg'},
                {id:7,title:'Very Intresting Title',content:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry-+s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.', imgURL:'/assets/dj7.jpg'}];
  factsLength = 7 ;
  fetchFacts(){
   // return this.http
   // .get<Fact[]>('https://musicmax-4ea40-default-rtdb.europe-west1.firebasedatabase.app/facts.json');
   console.log(this.facts.slice())
   return this.facts.slice();
  }
  fetchFact(id:number){
     let fact:Fact = this.facts.find(fact=>{return fact.id === id});
     console.log(fact);
    return fact;
  }
  factToAdd:Fact ; 
  storeFact(fact:Fact){
    //return this.http.put('https://musicmax-4ea40-default-rtdb.europe-west1.firebasedatabase.app/facts.json',fact);
    this.factToAdd = {id:-1,content:'',title:'',imgURL:''};
    console.log(fact);

    Object.assign(this.factToAdd, fact); 
    console.log(this.factToAdd);
    console.log(fact);
    this.factToAdd.id = this.factsLength + 1;

    this.factsLength = this.facts.unshift(this.factToAdd);
    this.factsChanged.next(true);
    console.log(this.facts);
  }


  //----------------Festival Simulation--------------------//
  

}
