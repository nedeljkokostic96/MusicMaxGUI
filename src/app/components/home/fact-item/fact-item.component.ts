import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Fact } from 'src/app/model/Fact';

@Component({
  selector: 'app-fact-item',
  templateUrl: './fact-item.component.html',
  styleUrls: ['./fact-item.component.css']
})
export class FactItemComponent implements OnInit {
  @Input() fact:Fact;

  @Input() index:number;
  pics:string[] = [
    'https://images.unsplash.com/photo-1527271982979-83fea3eb3582?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=676&q=80',
    'https://images.unsplash.com/photo-1527061011665-3652c757a4d4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=633&q=80',
    'https://images.unsplash.com/photo-1567653418876-5bb0e566e1c2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=80',
    'https://images.unsplash.com/photo-1555988776-c3f17e5cb789?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=967&q=80',
    'https://images.unsplash.com/photo-1581022295432-7fabcc628434?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    'https://images.unsplash.com/photo-1497114046243-1154db4f4abf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1117&q=80',
    'https://images.unsplash.com/photo-1462823985959-022de68638a2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1189&q=80',
    'https://images.unsplash.com/photo-1514517521153-1be72277b32f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
    'https://images.unsplash.com/photo-1529245856630-f4853233d2ea?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80',
    
  ]

  get pic():string{
    if (this.index > this.pics.length)
    this.index = this.pics.length
    return this.pics[this.index];
  }



  constructor(private router:Router,private route:ActivatedRoute) { }

  ngOnInit(): void {
  }

  handleCommentRoute(){
    this.router.navigate([`../`+this.fact.idFunFact],{relativeTo:this.route})
   
  }

}
