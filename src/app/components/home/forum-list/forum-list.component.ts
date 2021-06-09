import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { Forum } from 'src/app/model/Forum';
import { StorageService } from 'src/app/services/storage.service';
import { CommentDialogComponent } from '../../dialogs/comment-dialog/comment-dialog.component';

@Component({
  selector: 'app-forum-list',
  templateUrl: './forum-list.component.html',
  styleUrls: ['./forum-list.component.css']
})
export class ForumListComponent implements OnInit {
  forums:Observable<any>;
  selectedForum:Forum;

  

  constructor(public dialog:MatDialog,private storage:StorageService) { }

  ngOnInit(): void {
    this.forums = this.storage.fetchForumTopics();
    this.storage.commentsUpdated.subscribe(async res=>{

      this.forums = this.storage.fetchForumTopics();
      
      let temp:any ;

      temp =   this.forums.pipe(
        map(txs => txs.find(txn => txn.idForumTopic === this.selectedForum.idForumTopic))
    );

   const answer = await  temp.pipe(take(1)).subscribe(res => {
      console.log("ttttttttttttttttttttt")
      console.log(res)
      this.selectedForum = res ;
    })
        console.log(temp)

    })
  }

  get num():number{
    return Math.ceil(Math.random() * (8 - 0) + 0);
  }
  selectForum(frm:Forum){
    this.selectedForum = frm;
    console.log(this.selectedForum.comments)
  }

  openDialogAddForum(){
    const dialogRef = this.dialog.open(CommentDialogComponent, {
     
      data: {textt:''}
    });
    dialogRef.afterClosed().subscribe( result=> {
      if(result){

         this.storage.saveForumTopic(result.textt);
         this.forums = this.storage.fetchForumTopics();
         this.storage.commentsUpdated.next(true);
     }
    });
  }


 

}
