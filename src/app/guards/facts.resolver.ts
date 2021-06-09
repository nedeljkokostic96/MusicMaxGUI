import { Injectable, OnInit } from '@angular/core';
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


  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<Fact[]>{

    return  this.storageService.fetchFacts().pipe(take(1));
}}
