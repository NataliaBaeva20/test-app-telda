import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from "../interfaces";
import { Observable, tap } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'http://localhost:3001'
  private token!: null

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('http://localhost:3001/users', {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      })
    });
  }

  register(user: User): Observable<User> {
    return this.http.post<User>('http://localhost:3001/signup', user)
  }

  login(user: User): Observable<{token: string}> {
    return this.http.post<{token: string}>('http://localhost:3001/signin', user)
      .pipe(
        tap(
          ({token}) => {
            localStorage.setItem('token', token)
            this.setToken(token);
            localStorage.setItem('userLogin', user.email)
          }
        )
      )
  }

  setToken(token: any) {
    this.token = token
  }

  getToken() {
    return this.token
  }

  isAuth(): boolean {
    return !!this.token
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userLogin');
    this.token = null
  }
}
