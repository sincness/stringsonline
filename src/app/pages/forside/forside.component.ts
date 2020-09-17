import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-forside',
  templateUrl: './forside.component.html',
  styleUrls: ['./forside.component.scss']
})
export class ForsideComponent implements OnInit {

  products;
  favorites = [];
  title = this.route.snapshot.data.title;

  constructor(public http: HttpService, private TitleService: Title, private route: ActivatedRoute, private cart: CartService) { }

  async ngOnInit() {
    this.TitleService.setTitle(this.title);
    this.products = await this.http.getProducts().toPromise();
    this.products = this.products.productgroups.items;

    // Destructuring af subgroups
    const subgroups = [];
    for (const i of this.products) {
      subgroups.push(i.subgroups);
    }

    // Destructuring af Arrays
    const nest = [];
    subgroups.map(x => nest.push(...x))
    const products = [];
    for (const e of nest) {
      products.push(e.products)
    }

    // Destructuring af Objects
    const rating = [];
    for (const b of products) {
      for (const a in b) {
        if (Object.prototype.hasOwnProperty.call(b, a)) {
          const element = b[a];
          rating.push(element);
        }
      }
    }

    // Sortering i forhold til bedste rating først
    rating.sort((z, y) => (z.rating > y.rating) ? -1 : (z.rating < y.rating) ? 1 : 0);

    // Push de fire bedst ratede til favorites variablen
    for (let r = 0; r < 4; r++) {
      const element = rating[r];
      this.favorites.push(element)
    }


    
    
  }

  toFixed(n) {
    return Number(n).toFixed();
  }

  async addProduct(id: string) {
    await this.cart.postCart(id);
  }
  
}
