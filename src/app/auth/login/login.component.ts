import { Component, OnInit } from '@angular/core';
import {UserService} from '../../shared/user.service';
import {AuthResponseData, AuthService} from '../auth.service';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoading = false;
  error: string = null;

  constructor(
      private authService: AuthService,
      private router: Router,
      private userService: UserService
  ) {}

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    let authObs: Observable<AuthResponseData>;
    this.isLoading = true;
    authObs = this.authService.login(email, password);
    authObs.subscribe(
      resData => {
        console.log(resData);
        this.isLoading = false;
        this.router.navigate(['/system']);
      },
      errorMessage => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.isLoading = false;
      }
    );
    form.reset();
  }
}
