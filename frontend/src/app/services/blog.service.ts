import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  private serverUrl = 'http://localhost:4000';

  constructor(private http: HttpClient) { }

  createBlog(blogData: any, headers: any): Observable<any> {
    const token = localStorage.getItem('token');

    if (token) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      return this.http.post<any>(`${this.serverUrl}/api/v1/blog/create`, blogData, { headers });
    } else{
      return throwError('Token is missing. Please log in.');
    }
  }

}