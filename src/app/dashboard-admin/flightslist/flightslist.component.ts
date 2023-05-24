import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { Flight } from 'src/app/Models/Flight';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-flightslist',
  templateUrl: './flightslist.component.html',
  styleUrls: ['./flightslist.component.css']
})
export class FlightslistComponent {

  flights:Flight[] = [];

  pageSizeOptions: number[] = [4, 8, 12];
  pageSize: number = 4; 
  pageIndex: number = 0;

  constructor(private adminservice:AdminService,private toastr:ToastrService)
  {
    this.adminservice.getFlights().subscribe((res) => {
      this.flights = res.data;
      this.toastr.show(res.message);
    })
  }


  onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.getPaginatedFlights();
  }

  getPaginatedFlights() {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.flights.slice(startIndex, endIndex);
  }
}
