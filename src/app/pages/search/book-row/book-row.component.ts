import { Component, Input } from '@angular/core';
import { BookTagComponent } from '../book-tag/book-tag.component';
import { RouterModule } from '@angular/router';
import { Book } from '../../../core/models/book';
import { IconAvatarComponent } from '../../../shared/icon-avatar/icon-avatar.component';

@Component({
  selector: 'app-book-row',
  imports: [BookTagComponent, IconAvatarComponent, RouterModule],
  templateUrl: './book-row.component.html',
  styleUrl: './book-row.component.css',
})
export class BookRowComponent {
  @Input() book: Book | undefined;
}
