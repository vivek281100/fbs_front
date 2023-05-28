// import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
// import { AuthserviceService } from '../authservice.service';
// import { Observable } from 'rxjs';

import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthserviceService } from '../authservice.service';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private service: AuthserviceService, private router: Router,private tostr:ToastrService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.service.isloggedin()) {
      const menu = state.url.split('/')[1]; // Extract the first segment of the URL
      if (menu === 'dashboard-admin' && this.service.getrole() !== 'Admin') {
        this.router.navigate(['dashboard']);
        this.tostr.warning('You dont have access.');
        return false;
      }
      return true;
    } else {
      this.router.navigate(['home/login']);
      return false;
    }
  }
}

