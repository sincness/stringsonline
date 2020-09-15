import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-kurv',
  templateUrl: './kurv.component.html',
  styleUrls: ['./kurv.component.scss']
})
export class KurvComponent implements OnInit {
  products;
  constructor(public cart: CartService) { }

  async ngOnInit() {
    this.products = await this.cart.getAll().toPromise();
    this.products = this.products.cartlines;
    // const sorted = [];
    // this.products.forEach(element => {
    //   // console.log(element);
    //   let isAlready = sorted.find( ( value ) => { 
    //     value.id == element.id;
    //   });
    //   if(!isAlready){
    //     sorted.push( element );
    //   } else {
    //     var index = sorted.indexOf(isAlready);
    //     sorted[index].name = sorted[index].name + element.name;
    //   }
    // });
    // console.log(sorted);
    
    // this.products = sorted;
    
    
    
    
  }

}
