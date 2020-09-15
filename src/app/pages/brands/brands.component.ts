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

}
