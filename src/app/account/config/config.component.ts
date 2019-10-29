import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from 'src/app/api.service';
import { UtilsService } from 'src/app/utils.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {

  constructor(
    private cookieService: CookieService,
    private apiService: ApiService,
    private utilService: UtilsService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    let role: Number
    this.apiService.getPermission(this.cookieService.get('token'))
            .subscribe(res => role = Number(res.body), err => role = 9)
            
    if (role == 9){
      this.router.navigate([''], {relativeTo: this.route})
      return
    }
    
  }

}
