import { AfterContentInit, Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommentDialogComponent } from 'src/app/components/dialogs/comment-dialog/comment-dialog.component';
import { Song } from 'src/app/model/Song';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-song-item',
  templateUrl: './song-item.component.html',
  styleUrls: ['./song-item.component.css']
})
export class SongItemComponent implements OnInit , AfterContentInit{

  numStars:number[] = [];
  panelOpenState:boolean = false;
  fileToUpload: File = null;
  @Input() song:Song;
  linkToDownload:string = '';
  constructor(private storageService:StorageService, public dialog:MatDialog) { }


  ngAfterContentInit(): void {
    let totalSum = 0;
    console.log('-------------------')
    console.log(this.song)
    this.song.grades.forEach((x:any)=>{
      totalSum += x.grade ? x.grade : x;
    })

    totalSum /= this.song.grades.length ;
    totalSum = Math.ceil(totalSum);
    console.log('----------222222222---------')
    console.log(totalSum)
    let i ;
    for( i = 0 ; i < totalSum ; i++){
      this.numStars.push(1)
    }

    
  }

  ngOnInit(): void {


 
    this.storageService.fetchUrlDownloadSong(this.song.idSong).subscribe((res:any)=>{
     
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
    link.download = "attachedFileTo"+this.song.name;
    link.href =  this.linkToDownload ;
    link.click();
}

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);

    this.storageService.saveFile(this.fileToUpload,this.song.idSong , true)
}

  rateStarSelected(index){
    this.storageService.rateSong(index, this.song.idSong)
  }


  openDialogAddForum(){
    const dialogRef = this.dialog.open(CommentDialogComponent, {
     
      data: {textt:'forum'}
    });

    dialogRef.afterClosed().subscribe(result=> {
      if(result){

        this.storageService.saveSongImpression(this.song.idSong, result.textt);

        

     }
    });

  }

}
