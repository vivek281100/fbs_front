import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { Flight } from 'src/app/Models/Flight';
import { AdminService } from 'src/app/services/admin.service';
import { FlightAddComponent } from './flight-add/flight-add.component';
import { FlightupdateComponent } from './flightupdate/flightupdate.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-flightslist',
  templateUrl: './flightslist.component.html',
  styleUrls: ['./flightslist.component.css']
})
export class FlightslistComponent implements OnInit {

  flights:Flight[] = [];
  
  updateflight!:any;

  pageSizeOptions: number[] = [4, 8, 12];
  pageSize: number = 4; 
  pageIndex: number = 0;

  constructor(private adminservice:AdminService,private toastr:ToastrService,private dialog:MatDialog, private route:Router )
  {
    this.refreshflights();
  }

  ngOnInit() {
    // this.refreshflights();
  }

  refreshflights()
  {
    this.adminservice.getFlights().subscribe((res) => {
      this.flights = res.data;
      // this.toastr.show(res.message);
    })
  }
 

//flight edit 
openEdit(id:number){
  this.adminservice.getflightbyid(id).subscribe((res) => {
    debugger
    if(res.success == false)
    {
      this.toastr.warning("Unable to find flight, try after some time");
    }
    this.adminservice.setFlightvalue(res.data);
    // console.log(this.updateflight)
    const updateref = this.dialog.open(FlightupdateComponent,{
      width:"80%",
      height:"70% "
    })
  })
// debugger
//   const updateref = this.dialog.open(FlightupdateComponent,{
    
//     data:this.updateflight,
//     width:"80%",
//     height:"70% "

//   })

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
    this.refreshflights();
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



  //sending flight id to bookinglist component
  flightbookings(id:number)
  {
    this.route.navigate(['/dashboard-admin/bookinglist',id]);
  }
}
