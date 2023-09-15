import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  // private serverUrl = 'http://localhost:4000';
  private serverUrl = 'https://bloggingbackend-qh6a.onrender.com';

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    ) { }

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
    const token = localStorage.getItem('token');

    if (token) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      return this.http.put<any>(`${this.serverUrl}/api/v1/blog/update/${id}`, updateData, { headers });
    } else {
      const errorMessage = 'Token is missing. Please log in.';
      this.toastr.warning(errorMessage);
      return throwError(errorMessage);
      
    }
  }

  deleteBlog(id: any): Observable<any> {
    const token = localStorage.getItem('token');

    if (token) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      return this.http.delete<any>(`${this.serverUrl}/api/v1/blog/delete/${id}`, { headers });
    } else {
      const errorMessage = 'Token is missing. Please log in.';
      this.toastr.warning(errorMessage);
      return throwError(errorMessage);
    }
  }
}