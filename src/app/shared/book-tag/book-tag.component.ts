import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-book-tag',
  imports: [],
  templateUrl: './book-tag.component.html',
  styleUrl: './book-tag.component.css',
})
export class BookTagComponent {
  @Input() category = '';
}
