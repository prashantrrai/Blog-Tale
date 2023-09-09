import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-newpost',
  templateUrl: './newpost.component.html',
  styleUrls: ['./newpost.component.css']
})
export class NewpostComponent implements OnInit {
  newpostForm!: FormGroup;

  constructor(
    private formbuilder: FormBuilder,
    private toastr: ToastrService,
    private _blog: BlogService
  ) {}

  ngOnInit(): void {
    this.newpostForm = this.formbuilder.group({
      title: ['', [Validators.required]],
      category: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(50)]],
      author: [''],
    });
  }

  onPublish(){
    if (this.newpostForm.valid) {
      const blogData = this.newpostForm.value;
      if (blogData.author === '') {
        delete blogData.author;
      }
      console.log(blogData)

      const token = localStorage.getItem('token');
      if (token) {
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`
        });

      this._blog.createBlog(blogData, { headers }).subscribe({
        next: (response: any) => {
          console.log(response)
          this.newpostForm.reset({
            category: '',
          });
          this.toastr.success(response.message);
        },
        error: (error: any) => {
          console.log(error);
          this.toastr.error(error.error.message);
        },
      });
    }else{
      this.toastr.error('Token is missing. Please log in.');
    }
    } else {
      this.toastr.warning('All Fields are Required');
    }
  }
}
