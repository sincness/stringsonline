import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { CookieService } from 'src/app/services/cookie.service';

@Component({
  selector: 'app-kassen',
  templateUrl: './kassen.component.html',
  styleUrls: ['./kassen.component.scss']
})
export class KassenComponent implements OnInit {
  order: FormGroup;

  // id = this.route.snapshot.params.id ? this.route.snapshot.params.id : null;
  constructor(private cookie: CookieService, private router: Router, private route: ActivatedRoute, private fb: FormBuilder, private http: HttpService) { }

  ngOnInit(): void {
    this.order = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      address: ['', Validators.required],
      zipcode: ['', Validators.required],
      city: ['', Validators.required],
      email: ['', Validators.required],
      phone: [''],
      delivery_zipcode: [''],
      delivery_address: [''],
      delivery_city: [''],
    })
  }

  get f() { return this.order.controls; }

  async submit() {

    if(this.order.valid) {
      let body = {
        firstname: this.f.firstname.value,
        lastname: this.f.lastname.value,
        address: this.f.address.value,
        zipcode: this.f.zipcode.value,
        city: this.f.city.value,
        email: this.f.email.value,
        status: 3,
        delivery_address: '',
        delivery_zipcode: '',
        delivery_city: '',
      }
      console.log(body);
      
      await this.http.postOrder(body).subscribe(res => {
        if(res.status) {
          // location.reload();
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
