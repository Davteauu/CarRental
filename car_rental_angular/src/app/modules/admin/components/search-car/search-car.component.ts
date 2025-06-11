import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AdminService} from '../../service/admin.service';
import {NzOptionComponent} from 'ng-zorro-antd/select';
import {NgZorroImportsModule} from '../../../../NgZorroImportsModule';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-post-car',
  imports: [
    NzOptionComponent,
    NgZorroImportsModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './post-car.component.html',
  styleUrl: './post-car.component.scss'
})
export class SearchCarComponent {

  searchCarForm!: FormGroup;
  listOfOption: Array<{label:string;value:string}> = [];
  listOfBrands = ['Toyota','Volkswagen','Ford','Honda','Chevrolet','Mercedes-Benz','BMW','Hyundai','Nissan','Kia','Audi','Lexus','Mazda','Renault','Peugeot','Subaru','Volvo','Fiat','Skoda','Tesla'];
  listOfType = ["Petrol","Hybrid","Diesel","Electric","CNG"];
  listOfColor = ["Red", "White","Black","Blue","Green", "Orange", "Gray","Silver"];
  listOfTransmission = ["Manual","Automatic"];
  isSpinning: boolean = false;
  cars: any = [];

  constructor(private fb: FormBuilder,
    private service: AdminService) {
    this.searchCarForm = this.fb.group({
      brand:[null],
      type:[null],
      transmission:[null],
      color:[null],
    })
  }

  searchCar(){
    this.isSpinning = true;
    console.log(this.searchCarForm.value);
    this.service.searchCar(this.searchCarForm.value).subscribe((res)=>{
      res.carDtoList.forEach((element:any)=>{
        element.processedImg = 'data:image/jpeg;base64,' + element.returnedImage;
        this.cars.push(element)
      });
      this.isSpinning = false;
    })
  }


}
