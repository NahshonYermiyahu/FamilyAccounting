import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import {UserAuthModel} from '../../../auth/userAuthModel';
import {UserService} from '../../../shared/user.service';
import {AuthService} from '../../../auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  sub: Subscription;
  date: Date = new Date();
  userAuthModel: UserAuthModel;
  userEmail: string;
  name: string;
  isLoaded = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit() {
      // this.userEmail = this.userService.getUserEmail();
      // this.sub = this.userService.getUser(this.userEmail)
      //   .subscribe(user => {
      //     this.name = user.name;
      //     this.isLoaded = true;
      //   })
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/auth']);
  }

  ngOnDestroy() {
    if(this.sub) {
      this.sub.unsubscribe();
    }
  }
}
