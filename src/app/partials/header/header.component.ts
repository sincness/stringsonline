import { Component, OnInit, OnChanges, ViewChild, HostListener } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  search: FormGroup;
  @ViewChild('quantity') quantity;
  items;

  @ViewChild('toolbar') toolbar;
  @ViewChild('sideToolbar') sideToolbar;
  @ViewChild('icon') icon;
  width: number = window.innerWidth;
  menuOpen: boolean;

  mobile: boolean;
  desktop: boolean;

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.width = window.innerWidth;
    this.breakpointBooleans()
    
  }


  constructor(private cart: CartService, public auth: AuthService, private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private TitleService: Title) { }

  async ngOnInit() {
    this.breakpointBooleans();
    this.search = this.fb.group({
      keyword: ['', Validators.required]
    });

    if (this.auth.online) {
      this.items = await this.cart.getQuantity();
    this.cart.currentCart.subscribe(async res => {
      this.quantity.nativeElement.classList.add('wiggle');
      setTimeout(() => {
        this.quantity.nativeElement.classList.remove('wiggle');
      }, 180);
      this.items = await this.cart.getQuantity();
      
    })
    }
  }

  submit() {
    if(this.form.keyword.value !== '') {
      this.router.navigate(['søg', this.form.keyword.value]);
    }
  }

  get form() {
    return this.search.controls;
  }

  menu() {
    (this.menuOpen) ? this.open() : this.close();
  }

  open() {
    // this.toolbar.nativeElement.style.marginLeft = '250px';
    this.sideToolbar.nativeElement.style.width = '250px';
    this.icon.nativeElement.textContent = 'menu_open';
  }

  close() {
    // this.toolbar.nativeElement.style.marginLeft = '0';
    this.sideToolbar.nativeElement.style.width = '0';
    this.icon.nativeElement.textContent = 'menu';
  }

  breakpointBooleans() {
    if(this.width > 1115) {
      this.desktop = true;
      this.mobile = false;
    }
    if(this.width < 1115) {
      this.desktop = false;
      this.mobile = true;
    }
  }

}
