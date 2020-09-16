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


  constructor(private http: HttpClient, private cookie: CookieService) {

  }

  async getQuantity() {
    const products: any = await this.getAll().toPromise();
    if(products.cartlines) {
      const map: any = new Map(products.cartlines.map(o => [o.product_id, {...o }]));
      // for (const {product_id} of products.cartlines) map.get(product_id).quantity++;
      const sortedproducts: any = Array.from(map.values());
      let total = 0;
      for (const p of sortedproducts) {
        total += +p.quantity;      
      }
      return total;
    } else {  
      return 0;
    }
  }
  

  getAll() {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.cookie.get('token')}`);
    return this.http.get('https://api.mediehuset.net/stringsonline/cart', { headers });
  }

  patch(body: object) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.cookie.get('token')}`);
    this.http.patch('https://api.mediehuset.net/stringsonline/cart', body, { headers }).subscribe(res => {
      console.log(res);
      
      this.cartSubject.next('added');
    })
  
  }

  patchAdd(product_id: string, amount: string) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.cookie.get('token')}`);
    const value = +amount + 1;
    
    let body = {
      product_id,
      field: 'quantity',
      value
    }
    this.http.patch('https://api.mediehuset.net/stringsonline/cart', body, { headers }).subscribe(res => {
      this.cartSubject.next('added');
    })
  
  }
  patchRemove(product_id: string, amount: string) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.cookie.get('token')}`);
    const value = +amount - 1;
    
    let body = {
      product_id,
      field: 'quantity',
      value
    }
    console.log(body);
    
    this.http.patch('https://api.mediehuset.net/stringsonline/cart', body, { headers }).subscribe(res => {
      this.cartSubject.next('removed');
    })
  }

  delete(id: string) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.cookie.get('token')}`);
    this.http.delete(`https://api.mediehuset.net/stringsonline/cart/${id}`, { headers }).subscribe(res => {
      if (res) this.cartSubject.next('product removed');
    })
  }

  deleteAll() {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.cookie.get('token')}`);
    return this.http.delete('https://api.mediehuset.net/stringsonline/cart', { headers }).subscribe(res => {
      console.log(res);
      if (res) this.cartSubject.next('removed');
    });
  }

  async postCart(id: string) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.cookie.get('token')}`);
    // this.cartItems.next([...this.cartItems.getValue(), data]);
    let products: any = await this.getAll().toPromise();
    products = products.cartlines;
    if (products === undefined) {
      console.log('den er ikke undefined');
      
      const product = {
        product_id: id,
        quantity: 1
      }
      await this.http.post<any>('https://api.mediehuset.net/stringsonline/cart', product, { headers }).subscribe(res => {
        console.log(res);
        
        if(res.status) this.cartSubject.next('added');  
      });
      console.log('test1');
      
    } else {
      console.log('test2');
      const check = products.some(e => e.product_id === id);
      if (check) {
        console.log('test3');
          for (const iterator of products) {
            if (iterator.product_id === id) {
              console.log('test4');
              
              let test: string | number = +iterator.quantity +1;
              test = test.toString();
  
              const body = {
                product_id: id,
                field: 'quantity',
                value: test
              };
              console.log(body);
              
              await this.patch(body)
            }
          }
        } else {
          const product = {
            product_id: id,
            quantity: 1
          }
          await this.http.post<any>('https://api.mediehuset.net/stringsonline/cart', product, { headers }).subscribe(res => {
            if(res.status) this.cartSubject.next('added');  
          });
        }
    }

      

    
  }

}
