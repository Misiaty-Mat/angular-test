import { inject } from '@angular/core';
import { CanActivateFn, CanMatchFn, Router } from '@angular/router';
import { LoginService } from '../login/login.service';

export const loginActivateGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService);
  const router = inject(Router);
  return loginService.isLoggedIn ? true : router.navigate(['/login']);
};

export const loginMatchGuard: CanMatchFn = (route, state) => {
  const loginService = inject(LoginService);
  return loginService.isLoggedIn;
}
