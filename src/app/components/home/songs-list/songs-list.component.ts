import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { Category } from 'src/app/model/Category';
import { Song } from 'src/app/model/Song';
import { isEmpty } from 'rxjs/operators'; 
import { StorageService } from 'src/app/services/storage.service';
import { SongDialogComponent } from '../../dialogs/song-dialog/song-dialog.component';

@Component({
  selector: 'app-songs-list',
  templateUrl: './songs-list.component.html',
  styleUrls: ['./songs-list.component.css']
})
export class SongsListComponent implements OnInit {
  categories:Observable<Category[]>;

  songs:Observable<Song[]>;

  composer:string;
  author:string;
  performer:string;


  constructor(private dialog :MatDialog, private _storage:StorageService) { }


  ngOnInit(): void {
 

    this._storage.fetchGenresAndNumSongs().subscribe(resp=>{

      let arrayOfGenres: Category[] = [];

      const mappedGenres =  resp.map((x:any)=>{
        console.log("23111111111111111111")
        console.log( resp)
       arrayOfGenres.push({genre: x.genre.name, numberOfSongs: x.numberOfSongs , idGenre: x.genre.idGenre})
      
       
      })
     const slicedArray =  arrayOfGenres.slice(0,16);
     console.log(slicedArray)
     
      this.categories = of(slicedArray);
    });

    this._storage.fetchSongs().subscribe(resp=>{
      console.log("------------------------------")
      console.log(resp)

      let arrayOfSongs:Song[ ] = [];

      resp.forEach((x:any)=>{

        arrayOfSongs.push({impressions:x.impressions,idSong:x.idSong,author: x.creator1.firstName + x.creator1.lastName , duration:Math.ceil(Math.random() * (270 - 150) + 150) , name : x.title, performer:x.performer.firstName + x.performer.lastName, composer:x.creator2.firstName + x.creator2.lastName, textSong: x.textSong, grades: x.grades
                          ,authorID: x.creator1.idCreator, composerID: x.creator2.idCreator, performerID:x.performer.performerId
        })
      })

      if(!this.songs)
      this.songs = of(arrayOfSongs);
    })

    this._storage.searchedSongs.subscribe(change=>{
      this.songs = of(change);
    })
    this._storage.selectedSongByTitle.subscribe((res:string)=>{
      console.log("--------------------------ssdasdasd")
      console.log(res)
      this._storage.getSongByTitl(res).subscribe(res=>{

        let arrayOfSongs:Song[ ] = [];

        res.forEach((x:any)=>{
  
          arrayOfSongs.push({impressions:x.impressions,idSong:x.idSong,author: x.creator1.firstName + x.creator1.lastName , duration:Math.ceil(Math.random() * (270 - 150) + 150) , name : x.title, performer:x.performer.firstName + x.performer.lastName, composer:x.creator2.firstName + x.creator2.lastName, textSong: x.textSong, grades: x.grades
                            ,authorID: x.creator1.idCreator, composerID: x.creator2.idCreator, performerID:x.performer.performerId
          })
        this._storage.searchedSongs.next(arrayOfSongs)
       this.songs = of(arrayOfSongs)
      })
  })

  }) 

}

  async search(){
   
   this._storage.searchSongsBy(this.author, this.composer, this.performer);

  }

  searchSongsByCategoryId(id:number){
    console.log(id)
    this._storage.fetchSongsByGenreId(id).subscribe(res=>{
      let arrayOfSongs:Song[ ] = [];

        res.forEach((x:any)=>{
  
          arrayOfSongs.push({impressions:x.impressions, idSong:x.idSong,author: x.creator1.firstName + x.creator1.lastName , duration:Math.ceil(Math.random() * (270 - 150) + 150) , name : x.title, performer:x.performer.firstName + x.performer.lastName, composer:x.creator2.firstName + x.creator2.lastName, textSong: x.textSong, grades: x.grades
                            ,authorID: x.creator1.idCreator, composerID: x.creator2.idCreator, performerID:x.performer.performerId
          })

        this._storage.searchedSongs.next(arrayOfSongs)
       this.songs = of(arrayOfSongs)
      
      })
    })
  }

  openDialog(){
    const dialogRef = this.dialog.open(SongDialogComponent, {
      width:'50vw',
      autoFocus: false,
      height: '90vh' 
     
    });

    dialogRef.afterClosed().subscribe(result=> {
      if(result){
      console.log( result) }
      this._storage.saveSong(result);
    });
  }

}
