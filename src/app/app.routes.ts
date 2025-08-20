import { Routes } from '@angular/router';
import { BookListComponent } from './pages/search/book-list/book-list.component';
import { BookDetailsComponent } from './pages/details/book-details/book-details.component';
export const routes: Routes = [
  { path: '', component: BookListComponent },
  { path: 'home', component: BookListComponent },
  { path: 'books/:isbn', component: BookDetailsComponent },
  { path: '**', redirectTo: '' },
];
