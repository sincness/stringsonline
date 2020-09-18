import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-kurv',
  templateUrl: './kurv.component.html',
  styleUrls: ['./kurv.component.scss']
})
export class KurvComponent implements OnInit {
  products;
  shownProducts;
  total: number = 0;
  constructor(public cart: CartService) { }

  async ngOnInit() {
    this.products = await this.cart.getAll().toPromise();
    this.products = this.products.cartlines;

    this.cart.currentCart.subscribe(async res => {
      this.products = await this.cart.getAll().toPromise();
      this.products = this.products.cartlines;
      this.calcTotal();
    })
    
    
    // const names = [{  product_id: 1, dyr: 'Abe' }, { product_id: 1, dyr: 'Abe'}, { product_id: 2, dyr: 'Hund'}, { product_id: 1, dyr: 'Abe'}, { product_id: 3, dyr: 'Svin'}, { product_id: 3, dyr: 'Svin'}, { product_id: 3, dyr: 'Svin'}, { product_id: 3, dyr: 'Svin'}, { product_id: 3, dyr: 'Svin'}];

    // const map = new Map(names.map(o => [o.product_id, {...o, count: 0 }]));
    // for (const {product_id} of names) map.get(product_id).count++;
    // const result = Array.from(map.values());
    // console.log(result);

    
    // console.log(this.products);
        
    this.calcTotal();
    // const sorted = [];
    // this.products.forEach(element => {
    //   const found = sorted.some(el => el.product_id === element.product_id);
    //   // console.log(found);
    //   if (!found) sorted.push(element);
    //   // if (found) {
        
    //   // }

    // });
    // this.products = sorted;
        
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

  add(id: string, amount: string) {
    this.cart.patchAdd(id, amount);



  }
  subtract(id: string, pid: string, amount: string) {  
      if (+amount === 1) this.cart.delete(id);
      this.cart.patchRemove(pid, amount);
  }

  delete(id: string) {
    this.cart.delete(id);
  }
  
  deleteAll() {
    this.cart.deleteAll();
  }

  calcTotal() {
    this.total = 0;
    if (this.products) {
      this.products.forEach(p => {
        let estimate = +p.quantity * +p.price;
        this.total += estimate;
      });
    }
  }



  addCart(pid: string, amount: string) {
    this.cart.patchAdd(pid, amount)
  }

  toFixed(n) {
    return Number(n).toFixed();
  }


  // regulateProducts() {
  //   const map: any = new Map(this.products.map(o => [o.product_id, {...o }]));
  //   for (const {product_id} of this.products) map.get(product_id).quantity++;
  //   this.products = Array.from(map.values());
  // }


}
