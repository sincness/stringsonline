import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-forside',
  templateUrl: './forside.component.html',
  styleUrls: ['./forside.component.scss']
})
export class ForsideComponent implements OnInit {

  products;
  title = this.route.snapshot.data.title;

  constructor(public http: HttpService, private TitleService: Title, private route: ActivatedRoute) { }

  async ngOnInit() {
    this.TitleService.setTitle(this.title);
    this.products = await this.http.getProducts().toPromise();
    this.products = this.products.productgroups.items;
    console.log(this.products);
    // this.http.products$.subscribe(res => console.log(res))
    
  }

}
