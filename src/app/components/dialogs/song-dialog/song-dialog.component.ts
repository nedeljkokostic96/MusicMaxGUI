import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith, take } from 'rxjs/operators';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-song-dialog',
  templateUrl: './song-dialog.component.html',
  styleUrls: ['./song-dialog.component.css']
})
export class SongDialogComponent implements OnInit {
  frmSong:FormGroup;

  myControlAuthor = new FormControl();
  optionsAuthor: {name:string,id:number}[] = [];
  filteredOptionsAuthor: Observable<{name:string,id:number}[]>;

  myControlComposer = new FormControl();
  optionsComposer: {name:string,id:number}[] = [];
  filteredOptionsComposer: Observable<{name:string,id:number}[]>;

  myControlPerformer = new FormControl();
  optionsPerformer: {name:string,id:number}[] = [];
  filteredOptionsPerformer: Observable<{name:string,id:number}[]>;

   creatorsTEMP : {name:string,id:number}[] = [];;
   performersTEMP : {name:string,id:number}[] = [];;

  constructor(private _formBuilder: FormBuilder,private storage:StorageService) { }

  ngOnInit(): void {
    this.frmSong = this._formBuilder.group({
      title: ['', Validators.required],
      text: ['', Validators.required],
      date: ['', Validators.required],
      idAuthor: ['', Validators.required],
      idPerformer: ['', Validators.required],
      idComposer: ['', Validators.required],
    });

    //controler za sve;

    this.storage.fetchCreators().pipe(take(1)).subscribe((res:any)=>{
      let creatorsTemp:{name:string,id:number}[] = [];
      let creatorsTemp2:{name:string,id:number}[] = [];
      let creatorsTemp3:{name:string,id:number}[] = [];
      res.forEach(item=>{
        let name:string = item.firstName+" "+item.lastName;
        creatorsTemp.push({name:name, id:item.idCreator})
        creatorsTemp2.push({name:name, id:item.idCreator})
        creatorsTemp3.push({name:name, id:item.idCreator})
      })
      console.log(creatorsTemp)
      this.optionsAuthor = creatorsTemp;
      this.optionsComposer = creatorsTemp2;
      this.creatorsTEMP = creatorsTemp3;
    })

    this.storage.fetchPerformers().pipe(take(1)).subscribe((res:any)=>{
      
      let performerstemp:{name:string,id:number}[] = [];
      let performerstemp2:{name:string,id:number}[] = [];
      console.log(res)
      res.forEach(item=>{
        let name:string = item.firstName+" "+item.lastName;
        console.log({name:name, id:item.idPerformer})
        performerstemp.push({name:name, id:item.idPerformer})
        performerstemp2.push({name:name, id:item.idPerformer})
      })
      console.log(performerstemp)
      this.optionsPerformer = performerstemp;
      this.performersTEMP = performerstemp2;
    })


    this.filteredOptionsAuthor = this.myControlAuthor.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterAuthor(value))
      );

      this.filteredOptionsComposer = this.myControlComposer.valueChanges
      .pipe(
        startWith(''),
        map(value => {
          console.log(value)
          return this._filterComposer(value)
        })
      );

      this.filteredOptionsPerformer = this.myControlPerformer.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterPerfomer(value))
      );


  }

  private _filterAuthor(value: string): {name:string,id:number}[] {
    
    const filterValue = value.toLowerCase();

    return this.optionsAuthor.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  private _filterComposer(value: string): {name:string,id:number}[] {
    const filterValue = value.toLowerCase();
    console.log(this.filteredOptionsComposer)
    return this.optionsComposer.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  private _filterPerfomer(value: string): {name:string,id:number}[] {
    const filterValue = value.toLowerCase();

    return this.optionsPerformer.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  getFromValues(){
  let text =   this.frmSong.get("text").value
   let title  = this.frmSong.get("title").value
   let date = this.frmSong.get("date").value

   let idPerformer:{name:string, id:number} ;
   let idAuthor :{name:string, id:number} ;
   let idComposer:{name:string, id:number} ;

    for(let i = 0 ;  i < this.performersTEMP.length ; i++){
      if(this.performersTEMP[i].name === this.myControlPerformer.value){
        idPerformer =this.performersTEMP[i];
        break;
      }
    }

    for(let i = 0 ;  i < this.creatorsTEMP.length ; i++){
      if(this.creatorsTEMP[i].name === this.myControlAuthor.value){
        idAuthor =this.creatorsTEMP[i];
        break;
      }
    }

    for(let i = 0 ;  i < this.creatorsTEMP.length ; i++){
      if(this.creatorsTEMP[i].name === this.myControlComposer.value){
        idComposer =this.creatorsTEMP[i];
        break;
      }
    }



   return  {
     text: text, title:title, date:date, idPerformer:idPerformer?.id, idAuthor:idAuthor?.id, idComposer:idComposer?.id
   }
  }
}


