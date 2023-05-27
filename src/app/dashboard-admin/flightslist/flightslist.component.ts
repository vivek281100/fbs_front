import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { Flight } from 'src/app/Models/Flight';
import { AdminService } from 'src/app/services/admin.service';
import { FlightAddComponent } from './flight-add/flight-add.component';

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

  constructor(private adminservice:AdminService,private toastr:ToastrService,private dialog:MatDialog)
  {
    this.adminservice.getFlights().subscribe((res) => {
      this.flights = res.data;
      this.toastr.show(res.message);
    })
  }


//flight edit 
openEdit(id:number){

}





//flight delete
deleteFlight(id:number)
{
  debugger
this.adminservice.deleteflight(id).subscribe((res) => {
debugger
  if(res.success)
  {
    this.toastr.success(res.message);
  }
  else{
    this.toastr.error(res.message);
  }
})
}


//Add Flight.
AddFlight(){
  this.dialog.open(FlightAddComponent,{
    width:"90%",
    height:"90%"
  }); 
}


  //pagenator
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
