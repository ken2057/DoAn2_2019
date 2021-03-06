import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../api/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  res: boolean

  constructor(
    private cookieService: CookieService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {

    await this.getPermission()
    
    return this.res
  }

  async getPermission() {
    await this.authService
      .getPermission(this.cookieService.get('token'))
      .toPromise().then(t => {
        this.res = (Number(t.body['role']) == 0)
        if (!this.res)
          this.router.navigate(['/'], {relativeTo: this.route})
    })
  }
}
