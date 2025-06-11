import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AdminService} from '../../../admin/service/admin.service';

@Component({
  selector: 'app-search-car',
  imports: [],
  templateUrl: './search-car.component.html',
  styleUrl: './search-car.component.scss'
})
export class SearchCarComponent {
  searchCarForm!: FormGroup;
  listOfOption: Array<{label:string;value:string}> = [];
  listOfBrands = ['Toyota','Volkswagen','Ford','Honda','Chevrolet','Mercedes-Benz','BMW','Hyundai','Nissan','Kia','Audi','Lexus','Mazda','Renault','Peugeot','Subaru','Volvo','Fiat','Skoda','Tesla'];
  listOfType = ["Petrol","Hybrid","Diesel","Electric","CNG"];
  listOfColor = ["Red", "White","Black","Blue","Green", "Orange", "Gray","Silver"];
  listOfTransmission = ["Manual","Automatic"];
  isSpinning = false;
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
