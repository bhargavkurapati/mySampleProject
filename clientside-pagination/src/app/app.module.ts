import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//import { HttpClient, HttpHeaders } from "@angular/common/http";
import { HttpClientModule } from '@angular/common/http'; 

import { BhargavPaginationComponent } from './bhargav-pagination/bhargav-pagination.component';
import { AppDetailsService} from '../app/app-details.service'

@NgModule({
  declarations: [
    AppComponent,
    BhargavPaginationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [AppDetailsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
