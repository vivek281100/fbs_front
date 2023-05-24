import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthserviceService } from '../../authservice.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private builder: FormBuilder, private service:AuthserviceService, private router: Router,
    private toastr: ToastrService) {

  }

  registerform = this.builder.group({
    // id: this.builder.control('', Validators.compose([Validators.required, Validators.minLength(5)])),
    userName: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.compose([Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')])),
    email: this.builder.control('', Validators.compose([Validators.required, Validators.email])),
    phonenumber : this.builder.control('',Validators.compose([Validators.required,Validators.pattern("^[7-9][0-9]{9}$")])),
    // gender: this.builder.control('male'),
    // role: this.builder.control(''),
    // isactive: this.builder.control(false)
  });
  proceedregister() {
    if (this.registerform.valid) {
      debugger
      this.service.RegisterUser(this.registerform.value).subscribe(result => {
        
        this.toastr.success(result.message)
        this.router.navigate(['../login'])
      });
    } else {
      this.toastr.warning('Please enter valid data.')
    }
  }
}
