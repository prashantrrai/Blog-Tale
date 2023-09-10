import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  private serverUrl = 'http://localhost:4000';

  constructor(private http: HttpClient) { }

  createBlog(blogData: any): Observable<any> {
    const token = localStorage.getItem('token');

    if (token) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      return this.http.post<any>(`${this.serverUrl}/api/v1/blog/create`, blogData, { headers });
    } else {
      return throwError('Token is missing. Please log in.');
    }
  }

  getBlog(): Observable<any> {
    return this.http.get<any>(`${this.serverUrl}/api/v1/blog/read`);
  }

  updateBlog(updateData: any, id: any): Observable<any> {
    console.log(id)
    const token = localStorage.getItem('token');

    if (token) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      return this.http.put<any>(`${this.serverUrl}/api/v1/blog/update/${id}`, updateData, { headers });
    } else {
      return throwError('Token is missing. Please log in.');
    }
  }

  deleteBlog(id: any): Observable<any> {
    console.log(id)
    const token = localStorage.getItem('token');

    if (token) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      return this.http.delete<any>(`${this.serverUrl}/api/v1/blog/delete/${id}`, { headers });
    } else {
      return throwError('Token is missing. Please log in.');
    }
  }
}