import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { BlogService } from 'src/app/services/blog.service';
import { UpdateDialogComponent } from 'src/app/shared/update-dialog/update-dialog.component';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent {
  blogArray: any[] = [];
  updateForm!: FormGroup
  id: any

  constructor(
    private _blog: BlogService,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getBlogData()
  }

  getBlogData() {
    this._blog.getBlog().subscribe({
      next: (response: any) => {
        this.blogArray = response.blogposts;
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  deleteBlog(item: any){
    const id= item
      console.log(id)
      this._blog.deleteBlog(id).subscribe({
        next: (response: any) => {
          console.log(response);
          this.toastr.success(response.message);
          this.getBlogData()
        },
        error: (error: any) => {
          console.log(error);
          this.toastr.error(error.error.message);
        },
      });
  }

  Openpopup(item: any){
    var _popup = this.dialog.open(UpdateDialogComponent, {
      width: '400px',
      height: "500px",
      data: {
        title: 'Update Blog Post',
        blogdata: item
      }
    })

    _popup.afterClosed().subscribe(items => {
      console.log(items)
      this.getBlogData()
    })
  }
}
