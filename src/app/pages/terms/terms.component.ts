import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.scss']
})
export class TermsComponent implements OnInit {
  title = this.route.snapshot.data.title;
  constructor(private TitleService: Title, private route: ActivatedRoute) { }

  ngOnInit() {
    this.TitleService.setTitle(this.title);
  }

}
