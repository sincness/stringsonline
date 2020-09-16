import { Component, OnInit, HostListener } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { map } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-produkter',
  templateUrl: './produkter.component.html',
  styleUrls: ['./produkter.component.scss']
})
export class ProdukterComponent implements OnInit {
  data;
  products;
  id = this.route.snapshot.params.id;
  title;


  constructor(public http: HttpService, private route: ActivatedRoute, private TitleService: Title, private router: Router) { }

  async ngOnInit() {
    this.data = await this.http.getProductsGroup(this.id).toPromise();
    this.products = this.data.group.products;
    this.data = this.data.group;
    this.title = `${this.data.title} ${this.route.snapshot.data.title}`;
    this.TitleService.setTitle(this.title);

    this.router.events.subscribe(async res => {
      if (res instanceof NavigationEnd) {
        this.id = this.route.snapshot.params.id;
        this.data = await this.http.getProductsGroup(this.id).toPromise();
        this.products = this.data.group.products;
        this.data = this.data.group;
       }
    });

  }


    async changeProducent(e) {
      this.data = await this.http.getProductsGroup(this.id).toPromise();
      this.products = this.data.group.products;
      this.data = this.data.group;
      const array = [];
      for (const i of this.products) {
        if (i.brand === e.target.value) {
          array.push(i);
        }
      }
      this.products = array;
    }

    // Change event binding til at differentiere metoderne til at sortere
    // det nuværende viste indhold i præsentationslaget.

    onChange(event) {
      switch (event.target.value) {
        case 'price1':
          this.sortPrice(1);
          break;
          case 'price2':
            this.sortPrice(2);
          break;
        case 'alfa1':
          this.sortName(1);
          break;
        case 'alfa2':
          this.sortName(2);
          break;
      }
    }
  
    // Sorter ud fra navn, med 2 metoder fra a - å og så fra å - a

  sortName(method) {
    if (method === 1) {
      this.products.sort((a, b) => (a.name < b.name) ? -1 : (a.name > b.name) ? 1 : 0);
    }
    if (method === 2) {
      this.products.sort((a, b) => (b.name < a.name) ? -1 : (b.name > a.name) ? 1 : 0);
    }
  }
  sortPrice(method) {
    if (method === 1) {
      this.products.sort((a, b) => (+a.price < +b.price) ? -1 : (+a.price > +b.price) ? 1 : 0);
    }
    if (method === 2) {
      this.products.sort((a, b) => (+b.price < +a.price) ? -1 : (+b.price > +a.price) ? 1 : 0);
    }
  }
}
