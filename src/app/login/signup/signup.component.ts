import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { User } from 'src/app/class/user';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  userSignUp: User;

  constructor(
    public apiService: ApiService
  ) {}

  ngOnInit() {
    this.userSignUp = new User()
  }

  @Output() signUp = new EventEmitter<string>();

  onSubmit() {
    this.apiService
        .postSignUp(this.userSignUp)
        .subscribe(response => {
          this.signUp.emit(this.userSignUp.username)
        }, error => {
          console.log(error)
        })
  }
}
