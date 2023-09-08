import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/core/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  // loggedIn: boolean = false;
  constructor(private router: Router, private toastr: ToastrService, public _auth: AuthenticationService) {}

  isUserLoggedIn(): boolean {
    return this._auth.loggedIn;
  }

  onLogout() {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');

    this._auth.setLoggedInStatus(false);

    this.toastr.info('Logged Out Successfully', 'Info');
    this.router.navigate(['/auth/login']);
    // this.loggedIn = true;
  }
}
