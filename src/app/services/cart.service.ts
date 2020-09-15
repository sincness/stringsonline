import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from './cookie.service';
import { Subject, BehaviorSubject, Observable, Subscriber } from 'rxjs';

interface Cart {
  products: Array<Product>;
}

interface Product {
  created: string | number;
  id: string | number;
  name: string;
  offerprice: string | number;
  price: string | number;
  product_id: string | number;
  quantity: string | number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {


  private cartSubject = new Subject<any>();
  public currentCart = this.cartSubject.asObservable();
  // private cart : string;


  constructor(private http: HttpClient, private cookie: CookieService) {

    // console.log(this.getAll())
    // console.log(this.currentCartValue);
    
    


    // this.cartSubject = new BehaviorSubject<Cart>(JSON.parse(this.cart));
    // this.currentCart = this.cartSubject.asObservable();

  }
  
  // public get currentCartValue() {
  //   return this.currentCart.value;
  // }

  getAll() {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.cookie.get('token')}`);
    return this.http.get('https://api.mediehuset.net/stringsonline/cart', { headers });
  }

  async postCart(data: object) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.cookie.get('token')}`);
    // this.cartItems.next([...this.cartItems.getValue(), data]);
      
    this.http.post<any>('https://api.mediehuset.net/stringsonline/cart', data, { headers }).subscribe(res => {
      console.log(res);
      
      if(res.status) this.cartSubject.next('added');  
    });
  }

}
