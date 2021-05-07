import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { slideInAnimation } from './util/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [ slideInAnimation ]
})
export class AppComponent implements OnInit {


  constructor(private authService:AuthenticationService, public router:Router) {}

  ngOnInit(): void {
    this.authService.autoLogin();
    
  }


  getAnimationData(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }
}
