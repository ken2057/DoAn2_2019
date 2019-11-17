import { NgxSpinnerService } from 'ngx-spinner';
import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { User } from 'src/app/class/user';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AccountService } from 'src/app/api/account.service';
import { DialogService } from 'src/app/services/dialog.service';

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
    public dialogService: DialogService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.userSignUp = new User('', '', '', [], '', new Date('1990/01/01'), '')
  }

  onSubmit() {
    this.spinner.show();
    
    this.isSignUp = true
    this.accountService
        .postSignUp(this.userSignUp)
        .subscribe(response => {
          this.router.navigate(['/Login'], { queryParams: { username: this.userSignUp.username }} )
          this.spinner.hide();
        }, error => {
          console.error(error)
          this.isSignUp = false
          this.dialogService.openModal('Error', error.error);
          this.spinner.hide();
        })
  }
}
