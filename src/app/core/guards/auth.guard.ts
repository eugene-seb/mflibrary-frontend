import { DestroyRef, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const destroyRef = inject(DestroyRef);
  const router = inject(Router);

  let isAuthenticated = false;

  authService.isAuthenticated$
    .pipe(takeUntilDestroyed(destroyRef))
    .subscribe((isAuth) => (isAuthenticated = isAuth));

  if (isAuthenticated) {
    return true;
  } else {
    return router.parseUrl('/home');
  }
};
