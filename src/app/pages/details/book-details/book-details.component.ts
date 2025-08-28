import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Book } from '../../../core/models/book';
import { BookService } from '../../../core/services/book.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BookTagComponent } from '../../../shared/book-tag/book-tag.component';
import { CommonModule } from '@angular/common';
import { IconAvatarComponent } from '../../../shared/icon-avatar/icon-avatar.component';

@Component({
  selector: 'app-book-details',
  imports: [CommonModule, BookTagComponent, IconAvatarComponent, RouterModule],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.css',
})
export class BookDetailsComponent implements OnInit {
  private bookService = inject(BookService);
  private route = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);

  book: Book | undefined;
  loading = true;
  error: string | null = null;
  isFavorite = false;

  async ngOnInit() {
    this.loadBookDetails();
  }

  loadBookDetails(): void {
    const isbn = this.route.snapshot.paramMap.get('isbn');
    if (!isbn) {
      this.error = 'No book ISBN provided';
      this.loading = false;
      return;
    }

    this.loading = true;
    this.error = null;

    this.bookService
      .getBookDetails(isbn)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (data) => {
          this.book = data;
          this.loading = false;
          // Initialize favorite state later
          // this.isFavorite = this.favoriteService.isFavorite(isbn);
        },
        error: (err) => {
          this.error = 'Failed to load book details. Please try again.';
          this.loading = false;
          console.error('Error loading book details:', err);
        },
      });
  }

  toggleFavorite(): void {
    if (!this.book) return;

    this.isFavorite = !this.isFavorite;

    // Integrate with favorite service later
    // if (this.isFavorite) {
    //   this.favoriteService.addToFavorites(this.book);
    // } else {
    //   this.favoriteService.removeFromFavorites(this.book.isbn);
    // }
  }

  shareBook(): void {
    if (!this.book) return;

    if (navigator.share) {
      navigator.share({
        title: this.book.title,
        text: `Check out "${this.book.title}" by ${this.book.author}`,
        url: window.location.href,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      // Show a toast notification here
      alert('Link copied to clipboard!');
    }
  }
}
