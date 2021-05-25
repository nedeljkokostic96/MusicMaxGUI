import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommentDialogComponent } from '../../dialogs/comment-dialog/comment-dialog.component';
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
  constructor(public dialog:MatDialog) { }

  ngOnInit(): void {
  }
  openDialogAddForum(){
    const dialogRef = this.dialog.open(CommentDialogComponent, {
     
      data: {textt:'forum'}
    });

  }
}
