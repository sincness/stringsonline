import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  login: FormGroup;
  returnUrl: string;
  error: string;
  title = this.route.snapshot.data.title;


  constructor(private auth: AuthService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private TitleService: Title) { }

  ngOnInit(): void {
    this.TitleService.setTitle(this.title);
    
    if (this.auth.currentUserValue) this.router.navigate(['/']);
    this.login = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
    console.log(this.form);
  
  }

  submit () {
    const userdata = {
      username: this.form.username.value,
      password: this.form.password.value
    };

    if (this.form.username.value && this.form.password.value) {
      this.auth.login(userdata).pipe( first() ).subscribe( data => {
        this.router.navigate([this.returnUrl]);
        location.reload();
    },
    error => {
        error.statusText === 'Unauthorized' ? this.error = 'Forkerte brugeroplysninger' : this.error = error.statusText;
        // this.error = error.statusText;
        setTimeout(_ => {
            this.error = '';
        }, 2000);
    });
    }

  }

  get form() {
    return this.login.controls;
  }
}
