import { Injectable } from '@angular/core';
import { Book } from '../models/book';
import { Observable, of } from 'rxjs';
import { BOOKS } from '../models/book-list';
/*
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
*/
@Injectable({
  providedIn: 'root',
})
export class BookService {
  //private bookUrlAPI: string = environment.bookUrlAPI;
  private books: Book[] = BOOKS;
  /*
  constructor(private http: HttpClient) { }

  public getAllBooks(): Observable<object>{
    return of(this.http.get(`${this.bookUrlAPI}/all_books`));
  }
    */

  getBooks(): Observable<Book[]> {
    return of(this.books);
  }

  getBookDetails(isbn: string): Observable<Book | undefined> {
    return of(this.books.find((book) => book.isbn === isbn));
  }
}
