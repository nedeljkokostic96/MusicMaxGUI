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
  constructor(private router:Router,private route:ActivatedRoute) { }

  ngOnInit(): void {
  }

  handleCommentRoute(){
    this.router.navigate([`../`+this.fact.id],{relativeTo:this.route})
   
  }

}
