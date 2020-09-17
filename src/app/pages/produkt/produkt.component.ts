import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { AuthService } from 'src/app/services/auth.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-produkt',
  templateUrl: './produkt.component.html',
  styleUrls: ['./produkt.component.scss']
})
export class ProduktComponent implements OnInit {
  product: any;

  pid = this.route.snapshot.params.id;
  title = this.route.snapshot.params.title;
  type = this.route.snapshot.params.type;
  
  seg = this.route.snapshot.url[1].path;
  score : number = 0;
  average;  
  constructor(public auth: AuthService, private cart: CartService, public http: HttpService, private route: ActivatedRoute, private router: Router) { }

  async ngOnInit(): Promise<void> {
    this.product = await this.http.getProductDetails(this.pid).toPromise();
    this.average = await this.http.getAverageRating(this.pid).toPromise();
    this.average = this.average.average_num_stars;
    this.getRating();

    this.http.ratingSubject.subscribe(async res => {
      setTimeout(async _ => {
        this.average = await this.http.getAverageRating(this.pid).toPromise();
        this.average = this.average.average_num_stars;
        console.log(this.average);
        
      }, 200);
    })
    
    
    this.router.events.subscribe(async res => {
      if (res instanceof NavigationEnd) {
        this.pid = this.route.snapshot.params.id;
        this.product = await this.http.getProductDetails(this.pid).toPromise();
        this.average = await this.http.getAverageRating(this.pid).toPromise();
        this.average = this.average.average_num_stars;
        this.getRating();

      }
    });
    }


  async addProduct(product_id: string, value: string) {
    this.cart.postQuantityCart(product_id, value);
  }



  onRateChange = (score) => {
    this.score = score;
    this.postRating(this.score);
  }

  postRating(num_stars) {
    const body = { product_id: this.pid, num_stars}
    this.http.postRating(body).subscribe(async res => {
      // if (res) {
      //   this.average = await this.http.getAverageRating(this.pid).toPromise();
      //   this.average = this.average.average_num_stars;
      // }
    })
  }

  async getRating() {
    await this.http.getRatings(this.pid).pipe(map(res => res.items)).subscribe(res => {
      for (const item of res) {
        if(item.user_id == this.auth.currentUserValue.user_id) this.score = +item.num_stars;
      }
    })
  }

  deleteRating() {
    this.http.deleteRating(this.pid).subscribe(async res => {
      if(res) {
        this.score = 0;
      }
    });
  }

  // Afrund decimal fra .5 og ned, og .5+ til  at runde op
  round(score) {
    return Math.round(score);
  }

  // Fjern decimaler fra pris 2999.00 => 2999
  toFixed(n) {
    return Number(+n).toFixed();
  }

}
