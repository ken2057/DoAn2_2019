import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/class/user';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent extends AppComponent {
  userSignUp: User;

  ngOnInit() {
    this.userSignUp = new User()
  }

  onSubmit() {
    this.apiService
        .postSignUp(this.userSignUp)
        .subscribe(response => {

        }, error => {
          
        })
  }
}
