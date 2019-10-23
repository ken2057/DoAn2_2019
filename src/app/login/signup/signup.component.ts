import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/class/user';
import { ApiService } from 'src/app/api.service';
import { CookieService } from 'ngx-cookie-service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  userSignUp: User;

  constructor(
    public apiService: ApiService,
    public router: Router
  ) {}

  ngOnInit() {
    this.userSignUp = new User()
  }

  onSubmit() {
    this.apiService
        .postSignUp(this.userSignUp)
        .subscribe(response => {
          this.router.navigateByUrl('../')
        }, error => {
          
        })
  }
}
