import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from './cookie.service';
import { Subject } from 'rxjs';

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
  
  subjectUpdate() {
    this.cartSubject.next('change');
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

  async postCart(product_id: string) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.cookie.get('token')}`);
    // this.cartItems.next([...this.cartItems.getValue(), data]);
    let products: any = await this.getAll().toPromise();
    products = products.cartlines;
    if (products === undefined) {
      const product = {
        product_id,
        quantity: 1
      }
      await this.http.post<any>('https://api.mediehuset.net/stringsonline/cart', product, { headers }).subscribe(res => {
        if(res.status) this.cartSubject.next('added');  
      });
      
    } else {
      const check = products.some(e => e.product_id === product_id);
      if (check) {
          for (const iterator of products) {
            if (iterator.product_id === product_id) {
              let value: string | number = +iterator.quantity +1;
              value = value.toString();
              const body = {
                product_id,
                field: 'quantity',
                value
              };
              await this.patch(body)
            }
          }
        } else {
          const product = {
            product_id,
            quantity: 1
          }
          await this.http.post<any>('https://api.mediehuset.net/stringsonline/cart', product, { headers }).subscribe(res => {
            if(res.status) this.cartSubject.next('added');  
          });
        }
    }
  }
  async postQuantityCart(product_id: string, newValue: string) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.cookie.get('token')}`);
    // this.cartItems.next([...this.cartItems.getValue(), data]);
    let products: any = await this.getAll().toPromise();
    products = products.cartlines;
    if (products === undefined) {
      
      const product = {
        product_id,
        quantity: 1
      }
      await this.http.post<any>('https://api.mediehuset.net/stringsonline/cart', product, { headers }).subscribe(res => {
        if(res.status) this.cartSubject.next('added');  
      });
      
    } else {
      const check = products.some(e => e.product_id === product_id);
      if (check) {
          for (const iterator of products) {
            if (iterator.product_id === product_id) {

              if(+newValue === 1) {

                let value: string | number = +iterator.quantity +1;
                value = value.toString();
                const body = {
                  product_id,
                  field: 'quantity',
                  value
                };
                await this.patch(body)
              } else {
                let value: string | number = +iterator.quantity + +newValue;
                value = value.toString();
                
                const body = {
                  product_id,
                  field: 'quantity',
                  value
                };
                console.log(body);
                await this.patch(body)
              }
              
            }
          }
        } else {
          
          const product = {
            product_id,
            quantity: 1
          }
          await this.http.post<any>('https://api.mediehuset.net/stringsonline/cart', product, { headers }).subscribe(res => {
            if(res.status) this.cartSubject.next('added');  
          });
        }
    }
  }

}
