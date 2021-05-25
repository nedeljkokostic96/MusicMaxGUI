import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FactsResolver } from 'src/app/guards/facts.resolver';
import { FactDetailsComponent } from './fact-details/fact-details.component';
import { FactItemComponent } from './fact-item/fact-item.component';
import { FactListComponent } from './fact-list/fact-list.component';
import { FestivalListComponent } from './festival-list/festival-list.component';
import { ForumListComponent } from './forum-list/forum-list.component';
import { HomeComponent } from './home.component';
import { SongsListComponent } from './songs-list/songs-list.component';

const routes: Routes = [{ path: '', component: HomeComponent   , children:[
                        {path:'', redirectTo:'facts', pathMatch:'full'},
                        {path:'facts', component:FactListComponent},
                        {path:'festivals', component:FestivalListComponent},
                        {path:'forum', component:ForumListComponent},
                        {path:'songs', component:SongsListComponent},
                        {path:':id', component:FactDetailsComponent}
                          ] },
                        ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
