import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FactItemComponent } from './fact-item/fact-item.component';
import { FactListComponent } from './fact-list/fact-list.component';
import { FactDetailsComponent } from './fact-details/fact-details.component';
import { FestivalListComponent } from './festival-list/festival-list.component';
import { CommentFestivalComponent } from './comment-festival/comment-festival.component';
import { CountDownComponent } from 'src/app/util/count-down/count-down.component';
import { SongsListComponent } from './songs-list/songs-list.component';
import { SongItemComponent } from './songs-list/song-item/song-item.component';
import { CategoryItemComponent } from './songs-list/category-item/category-item.component';




@NgModule({
  declarations: [
    HomeComponent,
    FactListComponent,
    FactItemComponent,
    FactDetailsComponent,
    FestivalListComponent,
    CommentFestivalComponent,
    CountDownComponent,
    SongsListComponent,
    SongItemComponent,
    CategoryItemComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule
  ],
 
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeModule { }
