import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Observable } from 'rxjs';
import {  Subject } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Category } from '../model/Category';
import { Fact } from '../model/Fact';
import { Comment } from '../model/Comment';
import { Festival } from '../model/Festival';
import { Song } from '../model/Song';
import { UserRegisterClient } from '../model/UserRegisterClient';
import { Forum } from '../model/Forum';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  searchedSongs:Subject<Song[]> =  new Subject();
  selectedSongByTitle:Subject<String> = new Subject();
  commentsUpdated:Subject<boolean> = new Subject();
  
  constructor(private http:HttpClient) { }

  BACK_BASE = "http://localhost:8080/MusicMax"
  factsChanged = new Subject<boolean>();
  

  fetchUrlDownloadSong(id:number){
    return this.http.get(this.BACK_BASE+"/files/song/"+id);
  }

  fetchUrlDownloadFunFact(id:number){
    return this.http.get(this.BACK_BASE+"/files/fun-fact/"+id);
  }

  saveFile(filee:File,id:number, song:boolean){

    const file: FormData = new FormData();
    file.append('file', filee, filee.name);
            
    this.http.post(this.BACK_BASE+"/files",file,{
        params:{
          id:id.toString(),
          song:song.toString()
        }
          
         }).subscribe(res=>console.log(res));
  }


  getMostActiveUser(){
    return this.http.get(this.BACK_BASE+"/clients/the-most-active-client");
  }

  saveSong(obj){
        
    this.http.post(this.BACK_BASE+"/songs",{
 ...obj
     
    }).subscribe(res=>console.log(res));
  }
  fetchCreators(){
    return this.http.get(this.BACK_BASE+"/creators");
  }
  fetchPerformers(){
    return this.http.get(this.BACK_BASE+"/performers");
  }

  saveFestivalComment(idFestival:number, text:string){
    this.http.post(this.BACK_BASE+"/festival-commnets",{
      idFestival:idFestival,
      text:text,
     
    }).subscribe(res=>console.log(res));
  }
  saveSongImpression(idSong:number, text:string ){
    
    this.http.post(this.BACK_BASE+"/impressions",{
      idSong:idSong,
      text:text,
     
    }).subscribe(res=>console.log(res));
  }

  saveForumTopicComment(idForumTopic:number, textComment:string ){
    let date = new Date();
    this.http.post(this.BACK_BASE+"/comments",{
      idForumTopic:idForumTopic,
      textComment:textComment,
      date:date
    }).subscribe(res=>console.log(res));
  }

  saveForumTopic(topic:string){
    this.http.post(this.BACK_BASE+"/forum-topic",{
      topic:topic
    }).subscribe(res=>console.log(res));
  }

  fetchForumTopics(){
    return this.http.get(this.BACK_BASE+"/forum-topic")
     
     //.subscribe(res=> {console.log("88888888888888888888888")
     //  console.log(res)});
  
  }

  rateSong(grade:number, idSong:number){
    this.http.post(this.BACK_BASE+"/grades",{
      grade:grade,
      idSong:idSong
    }).subscribe(res=>console.log(res));
  }

  fetchPopularSong(){
    return this.http.get(this.BACK_BASE+"/songs/best-graded-song");
  
  }

  fetchFact(id:number):Observable<Fact>{
    return this.http.get<Fact>(this.BACK_BASE+"/fun-facts/fact/"+id);
    
  }

  storeFact(fact:Fact){
  let  factDto= {
    text:fact.text
    }
    console.log(factDto)
     this.http.post(this.BACK_BASE+"/fun-facts",{
      text:fact.text
    }).subscribe(res=>console.log(res));
 //   this.factToAdd = {id:-1,content:'',title:'',imgURL:''};
//    console.log(fact);
//
 //   Object.assign(this.factToAdd, fact); 
 //   console.log(this.factToAdd);
  //  console.log(fact);
  //  this.factToAdd.id = this.factsLength + 1;
//
 //   this.factsLength = this.facts.unshift(this.factToAdd);
  //  this.factsChanged.next(true);
 //   console.log(this.facts);
  }




  fetchFacts(){
 
 return    this.http
    .get<Fact[]>(this.BACK_BASE+"/fun-facts")
   
  }

  fetchSongsByGenreId(id:number):Observable<Song[]>{
    return this.http.get<Song[]>(this.BACK_BASE+"/songs/genre/"+id);
  }

  fetchFestivals():Observable<Festival[]>{
    return this.http.get<Festival[]>(this.BACK_BASE+"/festivals")
  }

  fetchCommentsForFestival(idF:number){
    return this.http.get<Comment[]>(this.BACK_BASE+"/comments",{
      params:{
        idFestival:idF.toString()
      }
    }
      )
  }

  fetchGenresAndNumSongs():Observable<Category[]>{
    return this.http.get<Category[]>(this.BACK_BASE+"/genres/with-songs-number");
  }

  fetchSongs():Observable<Song[]>{
    return this.http.get<Song[]>(this.BACK_BASE+"/songs");
  }

  getSongByTitl(title:string):Observable<Song[]>{
    return this.http.get<Song[]>(this.BACK_BASE+"/songs/title",{
      params:{
        title:title
      }
    })
  }

  searchSongsBy(authorr:string, composerr:string, performerr:string){
    if(!authorr && !composerr && !performerr){
      this.http.get<Song[]>(this.BACK_BASE+"/songs").subscribe(res=>{

        let arrayOfSongs:Song[ ] = [];

        res.forEach((x:any)=>{
  
          arrayOfSongs.push({impressions:x.impressions,idSong: x.idSong, author: x.creator1.firstName + x.creator1.lastName , duration:Math.ceil(Math.random() * (270 - 150) + 150) , name : x.title, performer:x.performer.firstName + x.performer.lastName, composer:x.creator2.firstName + x.creator2.lastName, textSong: x.textSong, grades: x.grades
                            ,authorID: x.creator1.idCreator, composerID: x.creator2.idCreator, performerID:x.performer.performerId
          })
        })

        this.searchedSongs.next(arrayOfSongs);
      })
     return;
    }

    let songsAuthor:Song[] = []; 
    let songsComposer:Song[] = []; 
    let songsPerformer:Song[] = []; 
    let  songs:Song[] = [];
    if(authorr){
      this.http.get<Song[]>(this.BACK_BASE+"/songs/byAuthorName",{
        params:{
        author:authorr
      }
      }).subscribe(res=>{


        let arrayOfSongs:Song[ ] = [];

        res.forEach((x:any)=>{
  
          arrayOfSongs.push({impressions:x.impressions,idSong: x.idSong,author: x.creator1.firstName + x.creator1.lastName , duration:Math.ceil(Math.random() * (270 - 150) + 150) , name : x.title, performer:x.performer.firstName + x.performer.lastName, composer:x.creator2.firstName + x.creator2.lastName, textSong: x.textSong, grades: x.grades
                            ,authorID: x.creator1.idCreator, composerID: x.creator2.idCreator, performerID:x.performer.performerId
          })
        })

        songsAuthor = arrayOfSongs.slice() ;
        console.log(songsComposer);
      })
    }
    if(composerr){
      this.http.get<Song[]>(this.BACK_BASE+"/songs/byComposerName",{
        params:{
        composer:composerr
      }
      }).subscribe(res=>{

        
        let arrayOfSongs:Song[ ] = [];

        res.forEach((x:any)=>{
  
          arrayOfSongs.push({impressions:x.impressions,idSong: x.idSong,author: x.creator1.firstName + x.creator1.lastName , duration:Math.ceil(Math.random() * (270 - 150) + 150) , name : x.title, performer:x.performer.firstName + x.performer.lastName, composer:x.creator2.firstName + x.creator2.lastName, textSong: x.textSong, grades: x.grades
                            ,authorID: x.creator1.idCreator, composerID: x.creator2.idCreator, performerID:x.performer.performerId
          })
        })


        songsComposer = arrayOfSongs.slice() ;
        console.log(songsComposer);
      })
    }
    if(performerr){
      this.http.get<Song[]>(this.BACK_BASE+"/songs/byPerformerName",{
        params:{
        performer:performerr
      }
      }).subscribe(res=>{
        
        console.log(res);

        let arrayOfSongs:Song[ ] = [];

        res.forEach((x:any)=>{
  
          arrayOfSongs.push({impressions:x.impressions,idSong: x.idSong,author: x.creator1.firstName + x.creator1.lastName , duration:Math.ceil(Math.random() * (270 - 150) + 150) , name : x.title, performer:x.performer.firstName + x.performer.lastName, composer:x.creator2.firstName + x.creator2.lastName, textSong: x.textSong, grades: x.grades
                            ,authorID: x.creator1.idCreator, composerID: x.creator2.idCreator, performerID:x.performer.performerId
          })
        })
        songsPerformer = arrayOfSongs.slice() ;
        console.log(songsPerformer);

      })
    }
    
    setTimeout( ()=>{
      songs = [];
      if(composerr){
        songsPerformer =   songsPerformer.filter(x=>x.composer.indexOf(composerr) != -1)
        songsAuthor=  songsAuthor.filter(x=>x.composer.indexOf(composerr) != -1)
      }
      if(authorr){
        songsPerformer =   songsPerformer.filter(x=>x.author.indexOf(authorr) != -1)
        songsComposer=    songsComposer.filter(x=>x.author.indexOf(authorr) != -1)
      }
      if(performerr){
        songsAuthor=  songsAuthor.filter(x=>x.performer.indexOf(performerr) != -1)
        songsComposer=  songsComposer.filter(x=>x.performer.indexOf(performerr) != -1)
      }
     
      songs= [...songsPerformer, ...songsAuthor, ...songsComposer ]
      console.log(songs)
      this.searchedSongs.next(songs);
    },100)

    this.searchedSongs.next(songs);
  }

  getSongsByCategory(categoryName:string):Observable<Song[]>{


    return null;
  }



  fetchUsers(){
    return this.http
    .get<UserRegisterClient>('https://musicmax-4ea40-default-rtdb.europe-west1.firebasedatabase.app/clientUsers.json');
  }

  storeUser(user:UserRegisterClient){
    return this.http.put('https://musicmax-4ea40-default-rtdb.europe-west1.firebasedatabase.app/clientUsers.json',user);
  }

  //----------------Facts Simulation--------------------//

//  facts:Fact[]=[{id:1,title:'Very Intresting Title',content:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry-+s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.', imgURL:'/assets/dj1.jpg'},
  //              {id:2,title:'Very Intresting Title',content:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry-+s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.', imgURL:'/assets/dj2.jpg'},
  //              {id:3,title:'Very Intresting Title',content:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry-+s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.', imgURL:'/assets/dj3.jpg'},
 //               {id:4,title:'Very Intresting Title',content:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry-+s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.', imgURL:'/assets/dj4.jpg'},
 //               {id:5,title:'Very Intresting Title',content:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry-+s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.', imgURL:'/assets/dj5.jpg'},
 //               {id:6,title:'Very Intresting Title',content:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry-+s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.', imgURL:'/assets/dj6.jpg'},
 //               {id:7,title:'Very Intresting Title',content:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry-+s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.', imgURL:'/assets/dj7.jpg'}];
 // factsLength = 7 ;
 

  //----------------Festival Simulation--------------------//
  

}
