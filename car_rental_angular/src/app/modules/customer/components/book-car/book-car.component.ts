import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {CustomerService} from '../../service/customer.service';
import {ActivatedRoute, Router} from '@angular/router';
import {StorageService} from '../../../../auth/services/storage/storage.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzOptionComponent } from 'ng-zorro-antd/select';
import { NgZorroImportsModule } from '../../../../NgZorroImportsModule';
import { CommonModule } from '@angular/common';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';

@Component({
  selector: 'app-book-car',
  imports: [
    NzDatePickerModule,
    RouterModule,
    NzOptionComponent,
    NgZorroImportsModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule],
  templateUrl: './book-car.component.html',
  styleUrls: ['./book-car.component.scss']
})
export class BookCarComponent {
  carId!: number;
  car: any;
  processedImage: any;
  validateForm!: FormGroup;
  isSpinning = false;
  dateFormat: string = "DD-MM-YYYY";

  constructor(
    private service: CustomerService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private message: NzMessageService,
    private router: Router
  ) {

  }

  ngOnInit() {
    this.carId =+ this.activatedRoute.snapshot.params["id"];
    this.validateForm = this.fb.group({
      toDate: [null, Validators.required],
      fromDate: [null, Validators.required],
    })
    this.getCarById();
  }

  getCarById() {
    this.service.getCarById(this.carId).subscribe((res) => {
      this.processedImage = 'data:image/jpeg;base64,' + res.returnedImage;
      this.car = res;
    });
  }
  bookACar(data: any) {
    console.log(data);
    this.isSpinning = true;
    let bookACarDto = {
      toDate: data.toDate,
      fromDate:data.fromDate,
      userId: StorageService.getUserId(),
      carId: this.carId
    }
    this.service.bookACar(bookACarDto).subscribe((res)=> {
      console.log(res);
      this.message.success("Booking request submitted successfully", {nzDuration: 5000});
      this.router.navigateByUrl("/customer/dashboard");
    }, error => {
      this.message.error("Something went wrong", { nzDuration: 5000});
    })
  }
}
