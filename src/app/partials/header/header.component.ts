import { Component, OnInit, OnChanges, ViewChild } from '@angular/core';
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
  constructor(private cart: CartService, public auth: AuthService, private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private TitleService: Title) { }

  async ngOnInit() {
    this.search = this.fb.group({
      keyword: ['', Validators.required]
    });
    this.items = await this.cart.getQuantity();
    this.cart.currentCart.subscribe(async res => {
      this.quantity.nativeElement.classList.add('wiggle');
      setTimeout(() => {
        this.quantity.nativeElement.classList.remove('wiggle');
      }, 180);
      this.items = await this.cart.getQuantity();
      
    })
  }

  submit() {
    if(this.form.keyword.value !== '') {
      this.router.navigate(['søg', this.form.keyword.value]);
    }
  }

  get form() {
    return this.search.controls;
  }

}
