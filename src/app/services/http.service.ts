import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { shareReplay, map } from 'rxjs/operators';
import { CookieService } from './cookie.service';
import { Observable, Subject } from 'rxjs';

interface Response {
  status: boolean;
  error: string;
  items: Array<any>;
}

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  public brandsCache$;
  public productsCache$;
  public ratingSubject = new Subject<any>();

  constructor(private http: HttpClient, private cookie: CookieService) { }

  // Metoder til at interagere med API'et
  getBrands() {
    return this.http.get('https://api.mediehuset.net/stringsonline/brands');
  }
  getProducts() {
    return this.http.get('https://api.mediehuset.net/stringsonline/');
  }

  getBrand(id: string) {
    return this.http.get(`https://api.mediehuset.net/stringsonline/brands/${id}`);
  }

  getProductDetails(id: string) {
    return this.http.get(`https://api.mediehuset.net/stringsonline/products/${id}`).pipe(
      map((res: any) => res.item)
    );
  }

  getProductByGroup(id: string) {
    return this.http.get(`https://api.mediehuset.net/stringsonline/product/groups/${id}`).pipe(
      map((res: any) => res.group.products)
    );
  }
  getProduct(id: string) {
    return this.http.get(`https://api.mediehuset.net/stringsonline/productgroups/${id}`).pipe(
      map((res: any) => res.group.products)
    );
  }
  getProductsGroup(id: string) {
    return this.http.get(`https://api.mediehuset.net/stringsonline/productgroups/${id}`);
  }

  postRating(data: object) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.cookie.get('token')}`);
    this.ratingSubject.next('change');
    return this.http.post(`https://api.mediehuset.net/stringsonline/ratings`, data, {headers});
  }

  getRatings(id: string) {
    return this.http.get<Response>(`https://api.mediehuset.net/stringsonline/ratings/list/${id}`)
  }

  deleteRating(id: string) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.cookie.get('token')}`);
    this.ratingSubject.next('change');
    return this.http.delete(`https://api.mediehuset.net/stringsonline/ratings/${id}`, {headers})
  }

  search(keyword: string) {
    return this.http.get<Response>(`https://api.mediehuset.net/stringsonline/search/${keyword}`).pipe(
      map(response => response.items)
    )
  }

  getOrders() {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.cookie.get('token')}`);
    return this.http.get<Response>('https://api.mediehuset.net/stringsonline/orders', {headers}).pipe(
      map(response => response.items)
    )
  }
  getOrder(oid: string) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.cookie.get('token')}`);
    return this.http.get<any>(`https://api.mediehuset.net/stringsonline/orders/${oid}`, {headers}).pipe(
      map(response => response.order)
    )
  }
  postOrder(data: object) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.cookie.get('token')}`);
    return this.http.post<any>(`https://api.mediehuset.net/stringsonline/orders`, data, {headers}).pipe(
      map(response => response)
    )
  }

  getAverageRating(pid: string) {    
    return this.http.get(`https://api.mediehuset.net/stringsonline/ratings/average/${pid}`);
  }

  





  get brands$(): Observable<any> {
    if (!this.brandsCache$) {
      this.brandsCache$ = this.getBrands().pipe(
        map((res: any) => res.items),
        shareReplay({ bufferSize: 1, refCount: true })
      );
    }
    return this.brandsCache$;
  }
  get products$(): Observable<any> {
    if (!this.productsCache$) {
      this.productsCache$ = this.getProducts().pipe(
        map((res: any) => res.productgroups.items),
        shareReplay({ bufferSize: 1, refCount: true })
      );
    }
    return this.productsCache$;
  }



}
