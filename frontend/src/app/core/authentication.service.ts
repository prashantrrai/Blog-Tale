import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
    loggedIn = false;
    private serverUrl = 'http://localhost:4000';

  constructor(private http: HttpClient) { }

  private getSessionHeaders(): HttpHeaders {
    const sessionToken = sessionStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionToken}`,
    });
  }

  registerUser(userData: any): Observable<any> {
    console.log(userData);
    return this.http.post<any>(`${this.serverUrl}/api/v1/users/register`, userData);
  }

  loginUser(loginData: any): Observable<any> {
    console.log(loginData);
    return this.http.post<any>(`${this.serverUrl}/api/v1/users/login`, loginData);
  }

  setLoggedInStatus(status: boolean) {
    this.loggedIn = status;
  }

}
