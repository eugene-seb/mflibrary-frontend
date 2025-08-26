import { inject } from '@angular/core';
import { CanActivateFn, ActivatedRouteSnapshot, Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

export const roleGuard: CanActivateFn = async (
  route: ActivatedRouteSnapshot
) => {
  const router = inject(Router);
  const auth = inject(AuthService);

  const userRoles = auth.getUserRoles();

  const requiredRoles = route.data['roles'] as string[];
  const hasRole = requiredRoles.some((role) => userRoles.includes(role));

  if (hasRole) {
    return true;
  } else { // Redirect to a "404 not found" page
    return router.parseUrl('/page-not-found');
  }
};
