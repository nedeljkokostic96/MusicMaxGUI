import { ThrowStmt } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params } from '@angular/router';
import { Fact } from 'src/app/model/Fact';
import { StorageService } from 'src/app/services/storage.service';
import { CommentDialogComponent } from '../../dialogs/comment-dialog/comment-dialog.component';

@Component({
  selector: 'app-fact-details',
  templateUrl: './fact-details.component.html',
  styleUrls: ['./fact-details.component.css']
})
export class FactDetailsComponent implements OnInit {
  selectedFact:Fact;
  selectedId:number;
  commentToBeAdded:string;

  constructor(private route:ActivatedRoute,private stroageService:StorageService,public dialog:MatDialog) { }

  ngOnInit(): void {
    this.route.params.subscribe((params:Params)=>{
      this.selectedId = +params['id'];
      console.log(this.selectedId)
      this.selectedFact = this.stroageService.fetchFact(this.selectedId);
      console.log(this.selectedFact)
    })
  }

  openDialog(){
    const dialogRef = this.dialog.open(CommentDialogComponent, {
     
      data: {textt:''}
    });

    dialogRef.afterClosed().subscribe(result=> {
      if(result){
        console.log(result);
          this.commentToBeAdded = result;   }
    });
  }

}
