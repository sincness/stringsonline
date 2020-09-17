import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {
  title = this.route.snapshot.data.title;
  keyword = this.route.snapshot.params.keyword;
  results;
  constructor(private TitleService: Title, private route: ActivatedRoute, public http: HttpService) { }

  async ngOnInit() {
    this.TitleService.setTitle(this.title);
    this.results = await this.http.search(this.keyword).toPromise();
    // console.log(this.results);
    
  }



  async changeProducent(e) {
    this.results = await this.http.search(this.keyword).toPromise();
    const array = [];
    for (const i of this.results) {
      if (i.brand === e.target.value) {
        array.push(i);
      }
    }
    this.results = array;
    if (e.target.value === 'null') {
      this.results = await this.http.search(this.keyword).toPromise();
    }
  }

  // Change event binding til at differentiere metoderne til at sortere
  // det nuværende viste indhold i præsentationslaget.

  onChange(event) {
    switch (event.target.value) {
      case 'price1':
        this.sortPrice(1);
        break;
        case 'price2':
          this.sortPrice(2);
        break;
      case 'alfa1':
        this.sortName(1);
        break;
      case 'alfa2':
        this.sortName(2);
        break;
    }
  }

  // Sorter ud fra navn, med 2 metoder fra a - å og så fra å - a

sortName(method) {
  if (method === 1) {
    this.results.sort((a, b) => (a.name < b.name) ? -1 : (a.name > b.name) ? 1 : 0);
  }
  if (method === 2) {
    this.results.sort((a, b) => (b.name < a.name) ? -1 : (b.name > a.name) ? 1 : 0);
  }
}
sortPrice(method) {
  if (method === 1) {
    this.results.sort((a, b) => (+a.price < +b.price) ? -1 : (+a.price > +b.price) ? 1 : 0);
  }
  if (method === 2) {
    this.results.sort((a, b) => (+b.price < +a.price) ? -1 : (+b.price > +a.price) ? 1 : 0);
  }
}
}
