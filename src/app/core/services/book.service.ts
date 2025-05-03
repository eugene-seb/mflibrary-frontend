import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
/*
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
*/
@Injectable({
  providedIn: 'root'
})
export class BookService {
  private bookUrlAPI: string = environment.bookUrlAPI;
/*
  constructor(private http: HttpClient) { }

  public getAllBooks(): Observable<object>{
    return of(this.http.get(`${this.bookUrlAPI}/all_books`));
  }
    */
}
