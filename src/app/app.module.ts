import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MaterialModule } from './shared/material/material.module';
import { LogInComponent } from './components/log-in/log-in.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingSpinnerComponent } from './util/loading-spinner/loading-spinner.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { InterceptorInterceptor } from './services/interceptor.interceptor';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { FactListComponent } from './components/home/fact-list/fact-list.component';
import { FactDialogComponent } from './components/dialogs/fact-dialog/fact-dialog.component';
import { CommentDialogComponent } from './components/dialogs/comment-dialog/comment-dialog.component';



@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    RegisterComponent,
    LoadingSpinnerComponent,
    NotFoundComponent,
    FactDialogComponent,
    CommentDialogComponent,

    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,

  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptorInterceptor,
    multi:true
  }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
