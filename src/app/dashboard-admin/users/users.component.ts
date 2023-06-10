import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { getUser } from 'src/app/Models/GetUser';
import { User } from 'src/app/Models/User';
import { AuthserviceService } from 'src/app/authservice.service';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit{

  users:getUser[] = [];

  newuser:boolean = false;

  pageSize:number = 5;
  pageIndex:number = 0;
  pageSizeOptions:number[] = [5,10,15];



  constructor(private adminservice: AdminService,private builder:FormBuilder,private toastr:ToastrService,private authservice:AuthserviceService)
   {
  //     this.adminservice.getusers().subscribe((res) => {
  //       console.log(res)
  //       this.users = res.data;
  //       console.log(this.users)
  //     })
  }

  ngOnInit() {
    this.refreshusers();
  }

  refreshusers() {
    this.adminservice.getusers().subscribe((res) => {
      console.log(res);
      this.users = res.data;
    });
  }

  ///adduser///----------------------------------

 
  adduserform = this.builder.group({
    userName: this.builder.control('', Validators.compose([Validators.required,Validators.minLength(4)])),
    password: this.builder.control('', Validators.compose([Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')])),
    email: this.builder.control('', Validators.compose([Validators.required, Validators.email])),
    phonenumber : this.builder.control('',Validators.compose([Validators.required,Validators.pattern("^[7-9][0-9]{9}$")])),
  });

  displayform()
  {
    this.newuser = true;
  }

  adduser()
  {
    if(this.adduserform.valid)
    {
    debugger
    this.authservice.RegisterUser(this.adduserform.value).subscribe((res) => {
      debugger
      if(res.success)
      {
        this.toastr.toastrConfig.closeButton = true;
        this.toastr.success(res.message);
        this.newuser = false;
        this.refreshusers();
            }
      else{
        this.toastr.warning(res.message);
      }
    })
  }else{
    this.toastr.warning("enter all fields!!");
  }
  }

  ////update user ////////--------------
  updateuser(id:number)
  {
    this.adminservice;
  }


  
  ////////remove user ///////-----------
  removeuser(id:number)
  {
    this.adminservice.deleteuser(id).subscribe((res) => {
      if(res.success)
      {
        this.toastr.success(res.message);
        this.refreshusers();
      }
      else{
        this.toastr.error(res.message);
      }
    })
  }

  onPageChange(event: PageEvent)
  {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    
  }

  getPaginatedUsers()
  {
    let startindex = this.pageIndex * this.pageSize;
    let lastindex = startindex + this.pageSize;
    return this.users.slice(startindex,lastindex);
  }
  
}
