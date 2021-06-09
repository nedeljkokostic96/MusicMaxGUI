import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Forum } from 'src/app/model/Forum';
import { StorageService } from 'src/app/services/storage.service';
import { CommentDialogComponent } from '../../dialogs/comment-dialog/comment-dialog.component';

@Component({
  selector: 'app-forum-item',
  templateUrl: './forum-item.component.html',
  styleUrls: ['./forum-item.component.css']
})
export class ForumItemComponent implements OnInit {
  @Input() forum:Forum;
  constructor(public dialog:MatDialog,private stroage:StorageService) { }

  ngOnInit(): void {
  }
  openDialogAddForum(){
    const dialogRef = this.dialog.open(CommentDialogComponent, {
     
      data: {textt:'forum'}
    });

    dialogRef.afterClosed().subscribe(result=> {
      if(result){

        this.stroage.saveForumTopicComment(this.forum.idForumTopic, result.textt);

        this.stroage.commentsUpdated.next(true);

     }
    });

  }
}
