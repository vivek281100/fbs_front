import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-bookinglist',
  templateUrl: './bookinglist.component.html',
  styleUrls: ['./bookinglist.component.css']
})
export class BookinglistComponent {
  id!:number;
  constructor(private routeactive:ActivatedRoute)
  {
    this.routeactive.paramMap.subscribe(params => {
      let value = params.get('id');
      if(value !== null)
      {
        this.id = +value;
      }
    })
  }
}
