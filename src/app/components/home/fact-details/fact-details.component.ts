import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ThrowStmt } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
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

  fileToUpload: File = null;

  postedBy:{lastName,firstName,email,birthDate:Date}
  linkToDownload:string = '';






  constructor(private breakpointObserver: BreakpointObserver,private route:ActivatedRoute,private stroageService:StorageService,public dialog:MatDialog) { }

  ngOnInit(): void {
    this.route.params.subscribe((params:Params)=>{
      this.selectedId = +params['id'];
      console.log(this.selectedId)
       this.stroageService.fetchFact(this.selectedId).subscribe((res:any)=>{
        
        this.postedBy = {email: res.client.email, firstName:res.client.firstName, lastName:res.client.lastName,birthDate:res.client.birthDate}
        this.selectedFact = {title: res.text.slice(0,15),idFunFact:res.idFunFact, text:res.text, imgURL:'https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1100&q=80'};
      })
     
    })
    this.stroageService.fetchUrlDownloadFunFact(this.selectedId).subscribe((res:any)=>{
      if(res){
        let url:string = res.urlResource;
        let index:number = url.indexOf('/assets')
        let urlNew = url.substr(index+8,url.length);
        this.linkToDownload = `\\assets` +"\\"+urlNew
        
      }
    })

  }

  downloadFile(){
    let link = document.createElement("a");
    link.download = "attachedFileTo"+this.selectedFact.title;
    link.href = this.linkToDownload ;
    link.click();
}

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);

    this.stroageService.saveFile(this.fileToUpload,this.selectedId , false)
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
