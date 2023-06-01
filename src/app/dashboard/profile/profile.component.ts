import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
// import { MatTab } from '@angular/material/tabs';
import { ToastrService } from 'ngx-toastr';

// import { User } from 'src/app/Models/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user:any = {};

  updateuserform!:FormGroup;

  // user : User  = {user_Name:'',email:'',password:'',phoneNumber:''}
  constructor(private userservice:UserService,private toastr:ToastrService,private builder: FormBuilder) {
    
    // console.log(this.user);
    this.userservice.getuserinfo().subscribe((res) => {
      if(res.success)
      {
      this.user = res.data;
      console.log(this.user);
      this.createForm();
      this.toastr.success(res.message);
      }
      else{
        this.toastr.warning(res.message);
      }
    })
    
  }

  ngOnInit(){
    // this.createForm();
  }

  getuser()
  {
    this.userservice.getuserinfo().subscribe((res) => {
      if(res.success)
      {
      this.user = res.data;
      console.log(this.user);
      this.toastr.success(res.message);
      }
      else{
        this.toastr.warning(res.message);
      }
    })
  }

createForm(){
 this.updateuserform = this.builder.group({
    userName:this.builder.control('',Validators.required),
    email:this.builder.control('',Validators.required),
    phoneNumber: this.builder.control('',Validators.required)
  })
}


  //updating user details.
  updateprofile()
  {
    if(this.updateuserform.valid)
    {
    debugger
    this.userservice.updateuser(this.updateuserform.value).subscribe((res) => {
      if(res.success)
      {
        debugger
        this.user = res.data;
        this.toastr.success(res.data);
        this.getuser();
      }
      else{
        this.toastr.warning(res.message);
      }
    });

  }else{
    this.toastr.warning("enter valid date")
  }
}


}
