import { Component, OnInit } from '@angular/core';
import {UserService} from '../../shared/user.service';
import {AuthResponseData, AuthService} from '../auth.service';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  isLoading = false;
  error: string = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    const name = form.value.name;
    let authObs: Observable<AuthResponseData>;
    this.isLoading = true;

      authObs = this.authService.signup(email, password);

    authObs.subscribe(
      resData => {
        console.log(resData);
        this.userService.addUser({email: email, name: name, id:resData.localId});
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
