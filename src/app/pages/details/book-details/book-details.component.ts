import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from '../../../core/models/book';
import { BookService } from '../../../core/services/book.service';

@Component({
  selector: 'app-book-details',
  imports: [],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.css',
})
export class BookDetailsComponent implements OnInit {
  private bookService = inject(BookService);
  private route = inject(ActivatedRoute);

  book: Book | undefined;

  async ngOnInit() {
    const isbn = this.route.snapshot.paramMap.get('isbn');
    if (isbn) {
      this.bookService
        .getBookDetails(isbn)
        .subscribe((data) => (this.book = data));
    }
  }
}
