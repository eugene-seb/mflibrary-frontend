import { Component, Input } from '@angular/core';
import { BookTagComponent } from '../book-tag/book-tag.component';
import { IconAvatarComponent } from '../icon-avatar/icon-avatar.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Book } from '../../core/models/book';

@Component({
  selector: 'app-book-card',
  imports: [BookTagComponent, IconAvatarComponent, RouterModule, CommonModule],
  templateUrl: './book-card.component.html',
  styleUrl: './book-card.component.css',
})
export class BookCardComponent {
  @Input() book: Book | undefined;
  isFavorite = false;

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
