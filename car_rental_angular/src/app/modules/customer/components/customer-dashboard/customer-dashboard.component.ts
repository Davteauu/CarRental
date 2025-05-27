import { Component } from '@angular/core';
import { CustomerService } from '../../service/customer.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgZorroImportsModule } from '../../../../NgZorroImportsModule';

@Component({
  selector: 'app-customer-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    NgZorroImportsModule,
    RouterModule
  ],
  templateUrl: './customer-dashboard.component.html',
  styleUrl: './customer-dashboard.component.scss'
})
export class CustomerDashboardComponent {

  cars: any = [];

  constructor(private service:CustomerService){

  }

  ngOnInit(){
    this.getAllCars();
  }

  getAllCars(){
    this.cars = [];
    this.service.getAllCars().subscribe((res) =>{
      console.log(res);
      res.forEach((element:any)=>{
        element.processedImg = 'data:image/jpeg;base64,' + element.returnedImage;
        this.cars.push(element)
      });
    })
  }

}
