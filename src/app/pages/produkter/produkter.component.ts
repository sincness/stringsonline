import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { map } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';

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


  constructor(private http: HttpService, private route: ActivatedRoute, private TitleService: Title, private router: Router) { }

  async ngOnInit() {
    this.data = await this.http.getProductsGroup(this.id).toPromise();
    this.products = this.data.group.products;
    this.data = this.data.group;
    console.log(this.data);
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

}
