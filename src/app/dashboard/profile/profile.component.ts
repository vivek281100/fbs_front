import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

import { User } from 'src/app/Models/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  user : User  = {user_Name:'',email:'',password:'',phoneNumber:''}
  constructor(private userservice:UserService,private toastr:ToastrService) {
    
  }
}
