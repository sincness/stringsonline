import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent implements OnInit {
  data;
  brand;
  id = this.route.snapshot.params.id;
  title;

  constructor(private http: HttpService, private route: ActivatedRoute, private TitleService: Title, private router: Router) { }

  async ngOnInit() {
    this.data = await this.http.getBrand(this.id).toPromise();
    this.brand = await this.data.item.products;
    this.data = this.data.item;
    this.title = `${this.data.title} ${this.route.snapshot.data.title}`;
    this.TitleService.setTitle(this.title);

    this.router.events.subscribe(async res => {
      if (res instanceof NavigationEnd) {
        this.id = this.route.snapshot.params.id;
        this.data = await this.http.getBrand(this.id).toPromise();
        this.brand = await this.data.item.products;
        this.data = this.data.item;
        
      }
    });

  }

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

  sortName(method) {
    if (method === 1) {
      this.brand.sort((a, b) => (a.name < b.name) ? -1 : (a.name > b.name) ? 1 : 0);
    }
    if (method === 2) {
      this.brand.sort((a, b) => (b.name < a.name) ? -1 : (b.name > a.name) ? 1 : 0);
    }
  }
  sortPrice(method) {
    if (method === 1) {
      this.brand.sort((a, b) => (+a.price < +b.price) ? -1 : (+a.price > +b.price) ? 1 : 0);
    }
    if (method === 2) {
      this.brand.sort((a, b) => (+b.price < +a.price) ? -1 : (+b.price > +a.price) ? 1 : 0);
    }
  }

}
