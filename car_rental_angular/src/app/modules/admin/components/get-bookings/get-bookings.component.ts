import {Component} from '@angular/core';
import {AdminService} from '../../service/admin.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { AdminModule } from '../../admin.module';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgZorroImportsModule } from '../../../../NgZorroImportsModule';
import { NzOptionComponent } from 'ng-zorro-antd/select';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-get-bookings',
  imports: [
    NgZorroImportsModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule],
  templateUrl: './get-bookings.component.html',
  styleUrl: './get-bookings.component.scss'
})
export class GetBookingsComponent {

  bookings: any;
  isSpinning = false;

  constructor(private adminService: AdminService,
              private message: NzMessageService) {

    this.getBookings();
  }

  getBookings() {
    this.isSpinning = true;
    this.adminService.getCarBookings().subscribe((res) => {
      this.isSpinning = false;
      console.log(res);
      this.bookings = res;
    })
  }

  changeBookingStatus(bookingId: number, status: string) {
    this.isSpinning = true;
    console.log(bookingId, status);
    this.adminService.changeBookingStatus(bookingId, status).subscribe({
      next: (res) => {
        this.isSpinning = false;
        console.log(res);
        this.getBookings();
        this.message.success("Booking status changed successfully!", {nzDuration: 5000});
      },
      error: (err) => {
        this.isSpinning = false;
        console.error(err);
        this.message.error("Something went wrong", {nzDuration: 5000});
      }
    });
  }


}
