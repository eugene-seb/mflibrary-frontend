import { Routes } from '@angular/router';

import { authGuard } from './core/guards/auth.guard';
import { BookListComponent } from './pages/search/book-list/book-list.component';
import { BookDetailsComponent } from './pages/details/book-details/book-details.component';
import { roleGuard } from './core/guards/role.guard';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { Roles } from './core/enums/roles.enum';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  { path: 'home', component: BookListComponent },

  {
    path: 'books',
    canActivateChild: [authGuard, roleGuard],
    data: { roles: [Roles.USER, Roles.MODERATOR, Roles.ADMIN] },
    children: [
      { path: 'details/:isbn', component: BookDetailsComponent },
      { path: '', component: BookListComponent },
    ],
  },

  { path: 'page-not-found', component: PageNotFoundComponent },
  { path: '**', redirectTo: 'page-not-found' },
];
