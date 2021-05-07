import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Fact } from '../model/Fact';
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class FactsResolver implements Resolve<Fact[]> {

  constructor(private storageService:StorageService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Fact[]{
    let factsArray:Fact[] = this.storageService.fetchFacts() ;
    console.log(factsArray);
  //---------will be like this when backend is added  
  //  this.storageService.fetchFacts().pipe(take(1), map(facts=>{
  //    factsArray =  facts;
  //   }));
    return factsArray;
}}
