import { Component, OnInit } from '@angular/core';
import { CookieService } from 'src/app/services/cookie.service';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-tak',
  templateUrl: './tak.component.html',
  styleUrls: ['./tak.component.scss']
})
export class TakComponent implements OnInit {
  id = this.route.snapshot.params.id;
  order: any;
  constructor(private cookie: CookieService, private route: ActivatedRoute, private http: HttpService) { }

  ngOnInit(): void {
  
    this.http.getOrder(this.id).subscribe((res: any) => {
      // this.order = res.order;
      this.order = res;

    })
  }

  ngOnDestroy() {
    this.cookie.delete('purchase');
  }

  toFixed(n) {
    return Number(+n).toFixed();
  }
}
