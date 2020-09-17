import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {
  @Input('crumbs') crumbs;
  // crumbs: Array<Object>;
  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    // this.setCrumb();
    this.router.events.subscribe(async res => {
        if (res instanceof NavigationEnd) {
          // this.setCrumb();
        }
    });
  }

  // setCrumb() {
  //   const paths = location.pathname.split('/');
  //   paths.shift();
  //   if(paths[0] === 'forside') paths.shift();

  //   this.crumbs = [];
  //   for (const path of paths) {
  //     // decodeURIComponent(path)
  //     // let uri = encodeURI(path);
  //     // uri = decodeURI(uri);
  //     // console.log(path);
      
  //     const decoded = decodeURIComponent(path);
  //     // this.crumbs.push({url: uri});
  //     this.crumbs.push({url: decoded});
  //   }
  //   // if(this.crumbs[2].url.includes('%20'))
  // }

}
