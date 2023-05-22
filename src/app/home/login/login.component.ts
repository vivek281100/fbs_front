import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthserviceService } from '../../authservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private builder: FormBuilder, private toastr: ToastrService, private service: AuthserviceService,
    private router: Router) {
      // sessionStorage.clear();

  }
  result: any;

  loginform = this.builder.group({
    username: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.required)
  });

  proceedlogin() {
    if (this.loginform.valid) {
      debugger
      this.service.Login(this.loginform.value).subscribe(item => {
        this.result = item
        console.log(this.result)
          if(item.success)
          {
            if (this.result.data.status) {
            this.toastr.success(item.message + " Loged In")
            sessionStorage.setItem('Token',this.result.data.token);
            sessionStorage.setItem('role',this.result.message);
            if(this.result.message == "Admin")
            {
            this.router.navigate(['dashboard-admin']);
            }
            else{
              this.router.navigate(['dashboard']);
            }
          } else {
                this.toastr.error('Please contact Admin', 'InActive User');
          }
        }
         else {
          this.toastr.error(item.message);
        };
      });
    } else {
      this.toastr.warning('Please enter valid data.')
    }
  }

}
