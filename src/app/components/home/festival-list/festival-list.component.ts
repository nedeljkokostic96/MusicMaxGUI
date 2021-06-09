import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { Observable, timer } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Festival } from 'src/app/model/Festival';
import { StorageService } from 'src/app/services/storage.service';
import { CommentDialogComponent } from '../../dialogs/comment-dialog/comment-dialog.component';


@Component({
  selector: 'app-festival-list',
  templateUrl: './festival-list.component.html',
  styleUrls: ['./festival-list.component.css']
})
export class FestivalListComponent implements OnInit {
  upcommingFestivals:Festival[]=[{dateEnd:new Date(10/1/2020) , dateBegin:new Date(5/1/2020) , description:'It was officially proclaimed “Best Major European Festival” at the EU Festival Awards 2013 and 2017, while No Sleep Festival held in Belgrade, the youngest member of the EXIT festival family, took home the “Best New Festival” title at the EU Festival Awards 2019. Also, EXIT’s Montenegrin edition Sea Dance Festival won the “Best Mid-Sized European festival” award in 2015. The EU Festival Award is considered as one of the most influential festival awards in the world. EXIT has also won the “Best Overseas Festival” award at the UK Festival Awards in 2007, as well as “Best Summer Music Festival in Europe” title for 2016 by the travel portal “European Best Destinations” awarded in cooperation with the European Commission. In March 2018 Regional Cooperation Council awarded EXIT Festival as Champion of Regional Cooperation for 2017.' , title:'Exit Festival' },
                                 {dateEnd:new Date(10/1/2020) , dateBegin:new Date(5/1/2020) , description:'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.' , title:'Primavera Sound' },
                                 {dateEnd:new Date(10/1/2020) , dateBegin:new Date(5/1/2020) , description:'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.' , title:'Let It Roll' },
                                 {dateEnd:new Date(10/1/2020) , dateBegin:new Date(5/1/2020) , description:'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.' , title:'Coachella Music & Arts Festival' },
                                 {dateEnd:new Date(10/1/2020) , dateBegin:new Date(5/1/2020) , description:'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.' , title:'Tomorrowland' },];
  finishedFestivals:Festival[]=[{dateEnd:new Date(10/1/2020) , dateBegin:new Date(5/1/2020) , description:'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.' , title:'Afro Nation ' },
  {dateEnd:new Date(10/1/2020) , dateBegin:new Date(5/1/2020) , description:'It was officially proclaimed “Best Major European Festival” at the EU Festival Awards 2013 and 2017, while No Sleep Festival held in Belgrade, the youngest member of the EXIT festival family, took home the “Best New Festival” title at the EU Festival Awards 2019. Also, EXIT’s Montenegrin edition Sea Dance Festival won the “Best Mid-Sized European festival” award in 2015. The EU Festival Award is considered as one of the most influential festival awards in the world. EXIT has also won the “Best Overseas Festival” award at the UK Festival Awards in 2007, as well as “Best Summer Music Festival in Europe” title for 2016 by the travel portal “European Best Destinations” awarded in cooperation with the European Commission. In March 2018 Regional Cooperation Council awarded EXIT Festival as Champion of Regional Cooperation for 2017..' , title:'Montreux Jazz Festival' },
  {dateEnd:new Date(10/1/2020) , dateBegin:new Date(5/1/2020) , description:'It was officially proclaimed “Best Major European Festival” at the EU Festival Awards 2013 and 2017, while No Sleep Festival held in Belgrade, the youngest member of the EXIT festival family, took home the “Best New Festival” title at the EU Festival Awards 2019. Also, EXIT’s Montenegrin edition Sea Dance Festival won the “Best Mid-Sized European festival” award in 2015. The EU Festival Award is considered as one of the most influential festival awards in the world. EXIT has also won the “Best Overseas Festival” award at the UK Festival Awards in 2007, as well as “Best Summer Music Festival in Europe” title for 2016 by the travel portal “European Best Destinations” awarded in cooperation with the European Commission. In March 2018 Regional Cooperation Council awarded EXIT Festival as Champion of Regional Cooperation for 2017..' , title:'Rolling Loud Portugal' },
  {dateEnd:new Date(10/1/2020) , dateBegin:new Date(5/1/2020) , description:'It was officially proclaimed “Best Major European Festival” at the EU Festival Awards 2013 and 2017, while No Sleep Festival held in Belgrade, the youngest member of the EXIT festival family, took home the “Best New Festival” title at the EU Festival Awards 2019. Also, EXIT’s Montenegrin edition Sea Dance Festival won the “Best Mid-Sized European festival” award in 2015. The EU Festival Award is considered as one of the most influential festival awards in the world. EXIT has also won the “Best Overseas Festival” award at the UK Festival Awards in 2007, as well as “Best Summer Music Festival in Europe” title for 2016 by the travel portal “European Best Destinations” awarded in cooperation with the European Commission. In March 2018 Regional Cooperation Council awarded EXIT Festival as Champion of Regional Cooperation for 2017..' , title:'Hellfest Open Air Festival' },
  {dateEnd:new Date(10/1/2020) , dateBegin:new Date(5/1/2020) , description:'It was officially proclaimed “Best Major European Festival” at the EU Festival Awards 2013 and 2017, while No Sleep Festival held in Belgrade, the youngest member of the EXIT festival family, took home the “Best New Festival” title at the EU Festival Awards 2019. Also, EXIT’s Montenegrin edition Sea Dance Festival won the “Best Mid-Sized European festival” award in 2015. The EU Festival Award is considered as one of the most influential festival awards in the world. EXIT has also won the “Best Overseas Festival” award at the UK Festival Awards in 2007, as well as “Best Summer Music Festival in Europe” title for 2016 by the travel portal “European Best Destinations” awarded in cooperation with the European Commission. In March 2018 Regional Cooperation Council awarded EXIT Festival as Champion of Regional Cooperation for 2017.nesciunt.' , title:'The Governors Ball Music Festival' },];;

  commentsVisible:boolean=false;

  fetchedFestivalsUpcomming:Festival[] = [];
  fetchedFestivalsDone:Festival[] = [];

  visibleComments:Comment[] = [];
  selectedFestival:Festival ;

  //fetchedFestivals:Observable<Festival[]> ;

  constructor(private storageService:StorageService,  public dialog:MatDialog) { }

  ngOnInit(): void {
      this.storageService.fetchFestivals().subscribe(res=>{
        console.log(res)
       let fetchedFestivals:Festival[]= [];
        res.forEach(x=>{
          let title =x.description.substr(0,7)
          fetchedFestivals.push({festivalComments:x.festivalComments,dateBegin: x.dateBegin, dateEnd : x.dateEnd , description: x.description, title:title, idFestival:x.idFestival})
        })

        fetchedFestivals.forEach(x=>{
          console.log(x.dateBegin)
          let today = new Date()
          let begin = new Date(x.dateBegin)
         
          if( begin > today){
            this.fetchedFestivalsUpcomming.push(x);
          }else{
            this.fetchedFestivalsDone.push(x);
          }
        })
        console.log( this.fetchedFestivalsUpcomming)
        console.log( this.fetchedFestivalsDone)
      })
  }

  getComments(finishedF:Festival){
    this.selectedFestival = finishedF;
      this.visibleComments = finishedF.festivalComments ;
      console.log("COMMENTS")
      console.log(this.visibleComments)
    this.commentsVisible=!this.commentsVisible

}


openDialogAddForum(){
  const dialogRef = this.dialog.open(CommentDialogComponent, {
   
    data: {textt:'forum'}
  });

  dialogRef.afterClosed().subscribe(result=> {
    if(result){

     this.storageService.saveFestivalComment(this.selectedFestival.idFestival, result.textt);

      

   }
  });

}

}
