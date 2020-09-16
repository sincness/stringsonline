import { Component, OnInit } from '@angular/core';
import { CookieService } from 'src/app/services/cookie.service';

@Component({
  selector: 'app-tak',
  templateUrl: './tak.component.html',
  styleUrls: ['./tak.component.scss']
})
export class TakComponent implements OnInit {

  constructor(private cookie: CookieService) { }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.cookie.delete('purchase');
  }

}
