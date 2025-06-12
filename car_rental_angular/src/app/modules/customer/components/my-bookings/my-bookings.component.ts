import { Component } from '@angular/core';
import { CustomerService } from '../../service/customer.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzOptionComponent } from 'ng-zorro-antd/select';
import { NgZorroImportsModule } from '../../../../NgZorroImportsModule';
import { CommonModule } from '@angular/common';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-my-bookings',
  imports: [
    NzOptionComponent,
    NgZorroImportsModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule],
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
