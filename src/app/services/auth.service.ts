import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CookieService } from './cookie.service';

interface User {
  username: string;
  password: string;
  access_token?: string;
  user_id?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient, private cookie: CookieService) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(this.cookie.get('user')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  public get online(): boolean {
    if (!this.currentUserValue) return false;
    if (this.currentUserValue) return true;
  }

  login(form: object) {
    return this.http.post<User>('https://api.mediehuset.net/token', form)
    .pipe(map(user => {
        this.cookie.set('token', user.access_token);
        this.cookie.set('user', JSON.stringify(user), 1);
        this.currentUserSubject.next(user);
    }));
  }

  logout() {
    this.cookie.delete('token')
    this.cookie.delete('user')
    this.currentUserSubject.next(null);
    location.reload();
  }

}
