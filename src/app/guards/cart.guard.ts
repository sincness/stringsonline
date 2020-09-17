import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CartService } from '../services/cart.service';

@Injectable({
  providedIn: 'root'
})
export class CartGuard implements CanActivate {
  constructor(private cart: CartService, private router: Router) { }
  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
      let x = await this.cart.getQuantity();      
      if(x === 0) {
        this.router.navigateByUrl('/');
        return false;
      }
      return true;
  }
  
}
