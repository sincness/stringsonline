import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const currentUser = this.auth.currentUserValue;
      if (currentUser) return true;
      const decodedURI = decodeURIComponent(state.url);
      this.router.navigate(['/login'], { queryParams: { returnUrl: decodedURI } });
      return false;
  }
  
}