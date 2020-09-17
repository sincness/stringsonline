import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { map } from 'rxjs/operators';
import { CartService } from 'src/app/services/cart.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input('id') id;
  @Input('price') price;
  @Input('stock') stock;
  @Input('image') image;
  @Input('description') description;
  @Input('name') name;
  @Input('url') url;
  title: string;
  check: boolean = false;
  check2: boolean = false;

  constructor(public auth: AuthService, private cart: CartService, private http: HttpService, private route: ActivatedRoute, private TitleService: Title, private router: Router) { }

  ngOnInit(): void {
    this.title = this.route.snapshot.params.title;
    if(this.route.snapshot.url[0].path === 'søg') this.check = true;
    if(this.route.snapshot.url[0].path !== 'søg') this.check = false;
    if(this.route.snapshot.url[0].path === 'brands') this.check2 = true;
    if(this.route.snapshot.url[0].path !== 'brands') this.check2 = false;
    
    this.router.events.subscribe(async res => {
      if (res instanceof NavigationEnd) {
        if(this.route.snapshot.url[0].path === 'søg') this.check = true;
        if(this.route.snapshot.url[0].path !== 'søg') this.check = false;
        if(this.route.snapshot.url[0].path === 'brands') this.check2 = true;
        if(this.route.snapshot.url[0].path !== 'brands') this.check2 = false;
       }
    });
  }

  async addProduct(id: string) {
    await this.cart.postCart(id);
  }


  toFixed(n) {
    return Number(n).toFixed();
  }





}
