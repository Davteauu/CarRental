import { Component } from '@angular/core';
import {CustomerService} from '../../service/customer.service';

@Component({
  selector: 'app-my-bookings',
  imports: [],
  templateUrl: './my-bookings.component.html',
  styleUrl: './my-bookings.component.scss'
})
export class MyBookingsComponent {

  bookings : any;
  isSpinning = false;
  constructor(private service: CustomerService) {
    this.getMyBookings();
  }

  getMyBookings(){
    this.isSpinning = true;
    this.service.getBookingByUserId().subscribe((res) => {
      this.isSpinning = false;
      //console.log(res);
      this.bookings = res;
    })
  }

}
