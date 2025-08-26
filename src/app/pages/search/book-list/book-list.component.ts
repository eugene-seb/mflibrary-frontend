import { Component, OnInit, inject } from '@angular/core';
import { BookRowComponent } from '../book-row/book-row.component';
import { BookService } from '../../../core/services/book.service';
import { Book } from '../../../core/models/book';

@Component({
  selector: 'app-book-list',
  imports: [BookRowComponent],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css',
})
export class BookListComponent implements OnInit {
  private bookService = inject(BookService);

  books: Book[] = [];

  async ngOnInit() {
    this.bookService.getBooks().subscribe((data) => (this.books = data));
  }
}
