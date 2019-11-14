import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { User } from 'src/app/class/user';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AccountService } from 'src/app/api/account.service';
import { DialogServiceService } from 'src/app/services/dialog-ser-vice.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  userSignUp: User;
  isSignUp = false

  form = new FormGroup({
    userName: new FormControl('',[Validators.required,Validators.minLength(3)]),
    passWord: new FormControl('',[Validators.required,Validators.minLength(3)]),
    Email: new FormControl('', [Validators.required,Validators.email])
  });

  constructor(
    private accountService: AccountService,
    private router: Router,
    private route: ActivatedRoute,
    public dialogService: DialogServiceService
  ) {}

  ngOnInit() {
    this.userSignUp = new User('', '', '', [], '', new Date('1990/1/1'), '')
  }

  onSubmit() {
    console.log(this.userSignUp.address)
    console.log(this.userSignUp.birth)
    this.isSignUp = true
    this.accountService
        .postSignUp(this.userSignUp)
        .subscribe(response => {
          this.router.navigate(['/Login'], { queryParams: { username: this.userSignUp.username }} )
        }, error => {
          console.log('error signUp:' + error)
          this.isSignUp = false
          this.dialogService.openModal('Error','SignUp failed')
        })
  }
}
