import { Dialog } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProfileComponent } from '../profile/profile.component';

@Component({
  selector: 'app-usernavbar',
  templateUrl: './usernavbar.component.html',
  styleUrls: ['./usernavbar.component.css']
})
export class UsernavbarComponent {

  /**
   *
   */
 
  constructor(private route:Router,private dialog:MatDialog) {
    
  }

  OnProfileClick()
  {
    this.dialog.open(ProfileComponent,{
      width:"90%",
      height:"90%"
    }); 
  }
  logout(){
    sessionStorage.clear();
    this.route.navigate(['home/login']);
  }
}
