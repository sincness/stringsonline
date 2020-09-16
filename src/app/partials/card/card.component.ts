import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { map } from 'rxjs/operators';
import { CartService } from 'src/app/services/cart.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';

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
  
  title: string;
  check: boolean = false;

  constructor(private cart: CartService, private http: HttpService, private route: ActivatedRoute, private TitleService: Title, private router: Router) { }

  ngOnInit(): void {
    this.title = this.route.snapshot.params.title;
    if(this.route.snapshot.url[0].path === 'søg') this.check = true;
    if(this.route.snapshot.url[0].path !== 'søg') this.check = false;
    
    this.router.events.subscribe(async res => {
      if (res instanceof NavigationEnd) {

       }
    });
  }

  async addProduct(id: string) {
    await this.cart.postCart(id);
  }



  // data;
  // products;
  // id = this.route.snapshot.params.id;
  // title;






}
