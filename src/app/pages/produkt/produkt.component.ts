import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-produkt',
  templateUrl: './produkt.component.html',
  styleUrls: ['./produkt.component.scss']
})
export class ProduktComponent implements OnInit {
  product: any;
  pid = this.route.snapshot.params.id;
  constructor(private cart: CartService, public http: HttpService, private route: ActivatedRoute, private router: Router) { }

  async ngOnInit(): Promise<void> {
    this.product = await this.http.getProductDetails(this.pid).toPromise();
    console.log(this.product);
    this.router.events.subscribe(async res => {
      if (res instanceof NavigationEnd) {
        this.pid = this.route.snapshot.params.id;
        this.product = await this.http.getProductDetails(this.pid).toPromise();
      }
    });
    
  }


  async addProduct(id: string) {
    await this.cart.postCart(id);
  }

}
