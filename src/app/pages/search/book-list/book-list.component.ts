import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

import { BookService } from '../../../core/services/book.service';
import { Book } from '../../../core/models/book';
import { BookCardComponent } from '../../../shared/book-card/book-card.component';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, BookCardComponent, ButtonModule],
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
})
export class BookListComponent implements OnInit {
  private bookService = inject(BookService);
  private destroyRef = inject(DestroyRef);

  books: Book[] = [];
  loading = true;
  error: string | null = null;

  currentPage = 1;
  pageSize = 12;
  totalPages = 1;
  totalItems = 0;

  async ngOnInit() {
    this.loadBooks();
  }

  loadBooks(): void {
    this.loading = true;
    this.error = null;

    this.bookService
      .getBooks(this.currentPage, this.pageSize)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          this.books = response.books;
          this.totalItems = response.totalItems;
          this.totalPages = Math.ceil(response.totalItems / this.pageSize);
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Failed to load books. Please try again.';
          this.loading = false;
          console.error('Error loading books:', err);
        },
      });
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadBooks();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadBooks();
    }
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadBooks();
    }
  }
}
