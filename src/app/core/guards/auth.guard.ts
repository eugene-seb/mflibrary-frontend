import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = async () => {
  
  const auth = inject(AuthService);
  const router = inject(Router);

  let isLoggedIn = false;
  auth.isLoggedIn().then((loggedIn: boolean)=> isLoggedIn = loggedIn);

  if (isLoggedIn) {
    return true;
  } else { // Redirect to a "404 not found" page
    return router.parseUrl('/page-not-found');
  }
};
