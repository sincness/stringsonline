import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { map } from 'rxjs/operators';
import { CartService } from 'src/app/services/cart.service';

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
  
  constructor(private cart: CartService) { }

  ngOnInit(): void {
  }

  async addProduct(id: string) {
    const product = {
      product_id: id,
      quantity: 1
    }
    await this.cart.postCart(product);
    
  }
}
