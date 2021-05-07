import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay, startWith } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { trigger, transition, query, style, animate } from '@angular/animations';
import { slideInAnimation } from 'src/app/util/animations';


export interface User {
  name: string;
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
  options: User[] = [
    {name: 'Jazz'},
    {name: 'Rap'},
    {name: 'House'}
  ];
  filteredOptions: Observable<User[]>;

  constructor(private breakpointObserver: BreakpointObserver,private authService:AuthenticationService,private router:Router,private route:ActivatedRoute) {}
  
  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.options.slice())
      );
  }

  displayFn(user: User): string {
    return user && user.name ? user.name : '';
  }

  private _filter(name: string): User[] {
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
