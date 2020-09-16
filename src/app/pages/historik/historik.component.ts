import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-historik',
  templateUrl: './historik.component.html',
  styleUrls: ['./historik.component.scss']
})
export class HistorikComponent implements OnInit {
  orders = [];
  constructor(public http: HttpService) { }

  async ngOnInit() {
    // await this.http.getOrders().subscribe(res => this.orders = res)
    await this.http.getOrders().subscribe(res => {
      this.orders = res;
      console.log(res);
      
    })
    // console.log(this.orders);
    
    // for (const order of this.orders) {
    
      // console.log(
      //   this.http.getOrder(order.id).toPromise()   
      // );
      
    // }
  }

  /**
   *
   * @param timestamp Unix Timestamp
   */
  timestampDate(timestamp) {
    return new Date(timestamp * 1000).toLocaleDateString('da-dk', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' });
  }

}
