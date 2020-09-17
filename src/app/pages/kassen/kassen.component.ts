import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { CookieService } from 'src/app/services/cookie.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-kassen',
  templateUrl: './kassen.component.html',
  styleUrls: ['./kassen.component.scss']
})
export class KassenComponent implements OnInit {
  order: FormGroup;
  @ViewChild('bank') bank;
  @ViewChild('creditcard') creditcard;
  @ViewChild('other') other;
  otherShipping: boolean = false;

  // id = this.route.snapshot.params.id ? this.route.snapshot.params.id : null;
  constructor(private cart: CartService, private cookie: CookieService, private router: Router, private route: ActivatedRoute, private fb: FormBuilder, private http: HttpService) { }

  ngOnInit(): void {
    this.order = this.fb.group({

      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      street: ['', Validators.required],
      zipcode: ['', Validators.required],
      city: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],

      otherstreet: [''],
      otherzipcode: [''],
      othercity: [''],

      paymentOption: [''],
      otherShippingaddress: [false],
  
      payment: [''],
  
      cardNumber: [''],
      month: [''],
      year: [''],
      ctr: [''],
      cardHolderName: ['']

      // firstname: ['', Validators.required],
      // lastname: ['', Validators.required],
      // address: ['', Validators.required],
      // zipcode: ['', Validators.required],
      // city: ['', Validators.required],
      // email: ['', Validators.required],
      // phone: ['', Validators.required],
      // delivery_zipcode: [''],
      // delivery_address: [''],
      // delivery_city: [''],
    })
  }

  get f() { return this.order.controls; }

  display(e) {
    if (e.currentTarget.parentNode.id === 'bankCheck') {
      this.bank.nativeElement.classList.add('open')
      this.creditcard.nativeElement.classList.remove('open')
      this.bank.nativeElement.parentNode.childNodes[0].childNodes[0].checked = true;
      this.creditcard.nativeElement.parentNode.childNodes[0].childNodes[0].checked = false;
    }
    if (e.currentTarget.parentNode.id === 'cardCheck') {
      this.creditcard.nativeElement.classList.add('open')
      this.bank.nativeElement.classList.remove('open')
      this.creditcard.nativeElement.parentNode.childNodes[0].childNodes[0].checked = true;
      this.bank.nativeElement.parentNode.childNodes[0].childNodes[0].checked = false;

    }
  }

  displayOther(e) {
    this.otherShipping = e.currentTarget.childNodes[0].checked;

    console.log(this.order.get('otherShippingaddress').value);
    if (e.currentTarget.childNodes[0].checked) {
      this.other.nativeElement.style.display = "block";
    } else {
      this.other.nativeElement.style.display = "none";
    }
  }


  async submit() {

    if(this.order.valid) {
      let body = {
        firstname: this.f.firstname.value,
        lastname: this.f.lastname.value,
        address: this.f.street.value,
        zipcode: this.f.zipcode.value,
        city: this.f.city.value,
        email: this.f.email.value,
        status: 3,
        delivery_address: '',
        delivery_zipcode: '',
        delivery_city: '',
      };
      
      await this.http.postOrder(body).subscribe(res => {
        if(res.status) {
          this.cart.subjectUpdate();
          this.cookie.set('purchase', 1);
          this.router.navigateByUrl(`/tak/${res.order_id}`);
          

        }
      });
    }



  }



  arrayOf(n: number) {
    return Array(n)
  }
}
