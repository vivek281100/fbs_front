import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent {

  /**
   *
   */
  constructor(private route:Router,private toastr:ToastrService) {
    
  }
logoutadmin(){
  sessionStorage.clear();
  this.toastr.success("logout successful");
    this.route.navigate(['home/login']);
}

}
