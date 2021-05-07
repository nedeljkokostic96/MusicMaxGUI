import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Fact } from 'src/app/model/Fact';
import { UserRegisterClient } from 'src/app/model/UserRegisterClient';
import { StorageService } from 'src/app/services/storage.service';
import { FactDialogComponent } from '../../dialogs/fact-dialog/fact-dialog.component';

@Component({
  selector: 'app-fact-list',
  templateUrl: './fact-list.component.html',
  styleUrls: ['./fact-list.component.css']
})
export class FactListComponent implements OnInit,OnDestroy {
  facts:Fact[];
  factsChanged:Subscription;
  newFact:Fact;
  panelOpenState = false;
  topActiveUsers:UserRegisterClient[];
  constructor(private router:Router, private route:ActivatedRoute,public dialog:MatDialog,private storageService:StorageService) { }

  ngOnDestroy(): void {
   this.factsChanged.unsubscribe();
  }

  ngOnInit(): void {
    this.newFact = {id:-1,content:'',title:'',imgURL:''};

    this.route.parent.data.subscribe((data:Data)=>{
      this.facts = data['factsArray'];
      console.log(data['factsArray']);
    });

    this.factsChanged = this.storageService.factsChanged.subscribe(res=>{
      if(res)
      this.facts = this.storageService.fetchFacts();
    })

    this.topActiveUsers =[{firstName:'Marco',lastName:'Polo',birthDate:'//', email:'//'},
                          {firstName:'Marco',lastName:'Polo',birthDate:'//', email:'//'},
                          {firstName:'Marco',lastName:'Polo',birthDate:'//', email:'//'}]
  }


  

  openDialog(){
    const dialogRef = this.dialog.open(FactDialogComponent, {
     
      data: {title:'' , content: '', imgURL:''}
    });

    dialogRef.afterClosed().subscribe(result=> {
      if(result){
      this.newFact.content = result.content;
      this.newFact.title = result.title;
      this.newFact.imgURL = result.imgURL;

     this.storageService.storeFact(this.newFact);
     this.newFact = {id:-1,content:'',title:'',imgURL:''}; }
    });
  }
  }


