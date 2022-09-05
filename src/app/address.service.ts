import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  private api="https://api.postcodes.io/postcodes/";

  constructor(private http: HttpClient) { }

  getData(term:string): Observable<any>{
    let url: string = this.api + term;
    return this.http.get<any>(url).pipe(map(res => res.result));
  }
}