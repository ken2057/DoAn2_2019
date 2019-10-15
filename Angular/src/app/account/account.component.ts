import { Component, OnInit, Injectable, Input } from '@angular/core';
import { AppComponent } from '../app.component';
import { User } from '../class/user';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
@Injectable()
export class AccountComponent extends AppComponent {
  @Input() user: User;
  account: User;

  ngOnInit(){
    this.account = this.user;
    console.log(this.account.username + ' - '+this.account.password);
  }
}
