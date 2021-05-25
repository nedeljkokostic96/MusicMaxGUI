import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommentDialogComponent } from '../../dialogs/comment-dialog/comment-dialog.component';
import { Forum } from '../forum-item/forum-item.component';

@Component({
  selector: 'app-forum-list',
  templateUrl: './forum-list.component.html',
  styleUrls: ['./forum-list.component.css']
})
export class ForumListComponent implements OnInit {
  forums:Forum[] = [{title:"Rock Music Facts"},{title:"New Album debate"},{title:"Guitar Lovers"}];
  selectedForum:Forum;


  constructor(public dialog:MatDialog) { }

  ngOnInit(): void {
    this.selectedForum = this.forums[0];
  }
  selectForum(frm:Forum){
    this.selectedForum = frm;
  }

  openDialogAddForum(){
    const dialogRef = this.dialog.open(CommentDialogComponent, {
     
      data: {textt:''}
    });

  }
}
