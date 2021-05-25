import { Component, Input, OnInit } from '@angular/core';
export interface Forum{
  title:string;
}
@Component({
  selector: 'app-forum-item',
  templateUrl: './forum-item.component.html',
  styleUrls: ['./forum-item.component.css']
})
export class ForumItemComponent implements OnInit {
  @Input() forum:Forum;
  constructor() { }

  ngOnInit(): void {
  }

}
