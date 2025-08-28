import { Injectable } from '@angular/core';
import { Observable, of, map } from 'rxjs';

import { Book } from '../models/book';
import { BOOKS } from '../models/book-list';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  //private bookUrlAPI: string = environment.bookUrlAPI;
  private allBooks: Book[] = BOOKS;
  /*
  constructor(private http: HttpClient) { }

  public getAllBooks(): Observable<object>{
    return of(this.http.get(`${this.bookUrlAPI}/all_books`));
  }
    */

  getBooks(
    currentPage = 1,
    pageSize = 12
  ): Observable<{ books: Book[]; totalItems: number }> {
    return of(this.allBooks).pipe(
      map((books) => {
        const startIndex = (currentPage - 1) * pageSize;
        const paginatedBooks = books.slice(startIndex, startIndex + pageSize);
        return {
          books: paginatedBooks,
          totalItems: books.length,
        };
      })
    );
  }

  getBookDetails(isbn: string): Observable<Book | undefined> {
    return of(this.allBooks.find((book) => book.isbn === isbn));
  }
}
