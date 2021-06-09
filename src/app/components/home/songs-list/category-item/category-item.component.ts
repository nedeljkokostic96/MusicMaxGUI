import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Category } from 'src/app/model/Category';

@Component({
  selector: 'app-category-item',
  templateUrl: './category-item.component.html',
  styleUrls: ['./category-item.component.css']
})
export class CategoryItemComponent implements OnInit {
  @Input() category:Category;
  @Output() catIdEmiter:EventEmitter<number> = new EventEmitter();

  num:number;
  constructor() { }

  ngOnInit(): void {
    this.num= Math.ceil(Math.random() * (8 - 0) + 0);
    console.log(this.num);
  }

  emitId(){
    console.log(this.category.idGenre)
    this.catIdEmiter.emit(this.category.idGenre);
  }

}
