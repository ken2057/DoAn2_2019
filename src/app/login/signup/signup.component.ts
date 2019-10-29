import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { User } from 'src/app/class/user';
import { ApiService } from 'src/app/api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  userSignUp: User;
  form = new FormGroup({
    userName: new FormControl('',[Validators.required,Validators.minLength(3)]),
    passWord: new FormControl('',[Validators.required,Validators.minLength(3)]),
    Email: new FormControl('', [Validators.required,Validators.email])
  });
  
  constructor(
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.userSignUp = new User()
  }

  onSubmit() {
    this.apiService
        .postSignUp(this.userSignUp)
        .subscribe(response => {
          this.router.navigate(['/Login'], { queryParams: { username: this.userSignUp.username }} )
        }, error => {
          console.log('error signUp:' + error)
        })
  }
}
