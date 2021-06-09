import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { Fact } from 'src/app/model/Fact';
import { Song } from 'src/app/model/Song';
import { UserRegisterClient } from 'src/app/model/UserRegisterClient';
import { StorageService } from 'src/app/services/storage.service';
import { FactDialogComponent } from '../../dialogs/fact-dialog/fact-dialog.component';

@Component({
  selector: 'app-fact-list',
  templateUrl: './fact-list.component.html',
  styleUrls: ['./fact-list.component.css']
})
export class FactListComponent implements OnInit,OnDestroy {
  facts:Observable<Fact[]>;
  factsChanged:Subscription;
  newFact:Fact;
  panelOpenState = false;
  topActiveUsers:Observable<{firstName:string,lastName:string,num:number,email:string}[]> ;

  topPopularSong:Song;
  constructor(private router:Router, private route:ActivatedRoute,public dialog:MatDialog,private storageService:StorageService) { }

  ngOnDestroy(): void {
   this.factsChanged.unsubscribe();
  }

  ngOnInit(): void {
    this.storageService.getMostActiveUser().subscribe((res:any)=>{
     console.log(res)
      let tempArr:{firstName:string,lastName:string,num:number,email:string}[] = [] ;
     // res.forEach(ress => {
        let temp:{firstName:string,lastName:string,num:number,email:string} = {firstName:'string',lastName:'string',num:0,email:'string'};
        temp.firstName = res.client.firstName
        temp.lastName = res.client.lastName
        temp.num = res.numberOfSongs
        temp.email = res.client.email
        tempArr.push(temp)
   //   });

      this.topActiveUsers = of(tempArr);
    })
    this.newFact = {idFunFact:-1,text:'',title:'',imgURL:''};

    this.route.parent.data.subscribe((data:Data)=>{
      let tempfacts:Fact[] =  data['factsArray'];
     
       tempfacts.map((x:any)=>{
         x.imgURL = 'https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1100&q=80'
         x.title = x.text.slice(0,15)
        })
      console.log(data['factsArray']);
      console.log(tempfacts);
      this.facts = of( tempfacts);
      console.log(this.facts);
      
    });
    this.storageService.fetchForumTopics();

    this.factsChanged = this.storageService.factsChanged.subscribe(res=>{
      
      this.facts = this.storageService.fetchFacts().pipe(take(1));

    })

    

    this.storageService.fetchPopularSong().pipe(take(1)).subscribe((res:any)=>{
     
      let author  =res.song.creator1.firstName + " " + res.song.creator1.lastName
      let composer =res.song.creator2.firstName + " " + res.song.creator2.lastName
      let name =res.song.title
      let performer =res.song.performer.firstName
      let textSong =res.song.textSong
      let grades = [res.grade]
      this.topPopularSong = {impressions:res.song.impressions,idSong: res.song.idSong, duration:196,author:author, composer:composer, name:name, performer:performer, textSong:textSong, grades:grades}
    });
  }


  

  openDialog(){
    const dialogRef = this.dialog.open(FactDialogComponent, {
     
      data: {title:'' , content: '', imgURL:''}
    });

    dialogRef.afterClosed().subscribe(result=> {
      if(result){
      this.newFact.text = result.content;
      this.newFact.title = result.title;
      this.newFact.imgURL = result.imgURL;

     this.storageService.storeFact(this.newFact);
     this.newFact = {idFunFact:-1,text:'',title:'',imgURL:''};
     
     }
    });
   
  }
  }


