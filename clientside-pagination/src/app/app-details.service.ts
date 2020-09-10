import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AppDetailsService {

  constructor(private httpClient: HttpClient) { }

  public getApiService(url) {
    return this.httpClient.get(url);
  }
}
