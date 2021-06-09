import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay, startWith } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { trigger, transition, query, style, animate } from '@angular/animations';
import { slideInAnimation } from 'src/app/util/animations';
import { StorageService } from 'src/app/services/storage.service';


export interface SongWrapper {
  name: string;
  id:number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  

})
export class HomeComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  

    myControl = new FormControl();
  options: SongWrapper[] = [];
  filteredOptions: Observable<SongWrapper[]>;

  constructor(private breakpointObserver: BreakpointObserver,private _storageService:StorageService,private authService:AuthenticationService,private router:Router,private route:ActivatedRoute) {}
  
  ngOnInit() {
    

    this._storageService.fetchSongs().subscribe(res=>{
      res.forEach((song:any)=>{
        this.options.push({name:song.title, id:song.idSong});
      })
    })
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.options.slice())
      );
  }

  displayFn(user: SongWrapper): string {
    return user && user.name ? user.name : '';
  }

  selectSong(name){
    console.log(name);
    this._storageService.selectedSongByTitle.next(name);
    this.router.navigate(['songs'],{relativeTo:this.route})
  }

  private _filter(name: string): SongWrapper[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }

  logOut(){
    this.authService.logout();
  }
  toHome(){
    this.router.navigate(['facts'],{relativeTo:this.route})
  }


}
