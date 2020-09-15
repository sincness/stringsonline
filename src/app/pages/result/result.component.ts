import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {
  title = this.route.snapshot.data.title;
  keyword = this.route.snapshot.params.keyword;
  results;
  constructor(private TitleService: Title, private route: ActivatedRoute, private http: HttpService) { }

  async ngOnInit() {
    this.TitleService.setTitle(this.title);
    this.results = await this.http.search(this.keyword).toPromise();
    console.log(this.results);
    
  }

}
