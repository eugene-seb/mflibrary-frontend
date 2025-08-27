import { DestroyRef, inject } from '@angular/core';
import { CanActivateFn, ActivatedRouteSnapshot, Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

export const roleGuard: CanActivateFn = async (
  route: ActivatedRouteSnapshot
) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const destroyRef = inject(DestroyRef);

  let userRoles: string[] = [];
  authService.roles$
    .pipe(takeUntilDestroyed(destroyRef))
    .subscribe((roles) => (userRoles = roles.map((r) => r.toLowerCase())));

  const requiredRoles = (route.data['roles'] as string[]).map((r) =>
    r.toLowerCase()
  );
  const hasRole = requiredRoles.some((role) => userRoles.includes(role));

  if (hasRole) {
    return true;
  } else {
    // Redirect to a "404 not found" page
    return router.parseUrl('/page-not-found');
  }
};
