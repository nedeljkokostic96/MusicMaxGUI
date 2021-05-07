import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/model/Category';
import { Song } from 'src/app/model/Song';

@Component({
  selector: 'app-songs-list',
  templateUrl: './songs-list.component.html',
  styleUrls: ['./songs-list.component.css']
})
export class SongsListComponent implements OnInit {
  categories:Category[]=[{name:'Rock',numSongs:543}, {name:'Techno',numSongs:213}, {name:'Country',numSongs:132}, {name:'EDM',numSongs:675}
  ,{name:'Rap',numSongs:1123}, {name:'Classical',numSongs:322}, {name:'Hip-Hop',numSongs:655}, {name:'Chill',numSongs:2322}]

  songs:Song[]=[{name:'Song for the unknowns',duration:3.6 , author:'John Doe'},
                {name:'Song for the unknowns',duration:3.6 , author:'John Doe'},
                {name:'Song for the unknowns',duration:3.6 , author:'John Doe'},
                {name:'Song for the unknowns',duration:3.6 , author:'John Doe'},
                {name:'Song for the unknowns',duration:3.6 , author:'John Doe'},
                {name:'Song for the unknowns',duration:3.6 , author:'John Doe'}]
  constructor() { }

  ngOnInit(): void {
  }

}
