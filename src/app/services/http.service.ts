import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { shareReplay, map } from 'rxjs/operators';
import { CookieService } from './cookie.service';
import { Observable } from 'rxjs';

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
    return this.http.post(`https://api.mediehuset.net/stringsonline/ratings`, data, {headers});
  }

  getRatings(id: string) {
    return this.http.get<Response>(`https://api.mediehuset.net/stringsonline/ratings/list/${id}`)
  }

  search(keyword: string) {
    return this.http.get<Response>(`https://api.mediehuset.net/stringsonline/search/${keyword}`).pipe(
      map(response => response.items)
    )
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
