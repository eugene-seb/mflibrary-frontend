import { Component, DestroyRef, inject, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { BookTagComponent } from '../book-tag/book-tag.component';
import { IconAvatarComponent } from '../icon-avatar/icon-avatar.component';
import { Book } from '../../core/models/book';
import { AuthService } from '../../core/services/auth.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-book-card',
  imports: [BookTagComponent, IconAvatarComponent, RouterModule, CommonModule],
  templateUrl: './book-card.component.html',
  styleUrl: './book-card.component.css',
})
export class BookCardComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  private authService = inject(AuthService);

  @Input() book: Book | undefined;
  isAuthenticated = false;
  isFavorite = false;

  async ngOnInit() {
    this.authService.isAuthenticated$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((isAuth) => (this.isAuthenticated = isAuth));
  }

  toggleFavorite(event: Event): void {
    event.stopPropagation();

    this.isFavorite = !this.isFavorite;

    // animation class for visual feedback
    const button = event.target as HTMLElement;
    button.classList.add('scale-110');
    setTimeout(() => {
      button.classList.remove('scale-110');
    }, 150);
  }
}
