import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';


@Component({
  selector: 'app-adminnavbar',
  templateUrl: './adminnavbar.component.html',
  styleUrls: ['./adminnavbar.component.css']
})
export class AdminnavbarComponent {

  /**
   *
   */
  constructor(private route:Router) {
  }

  @ViewChild('sidenav') sidenav!: MatSidenav;

  toggleSidenav() {
    this.sidenav.toggle();
  }


  logout(){
    sessionStorage.clear();
    this.route.navigate(['home/login']);
  }
}
