import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { AdminModule } from '../../admin.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminService } from '../../service/admin.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';
import { NgZorroImportsModule } from '../../../../NgZorroImportsModule';
import { NzOptionComponent } from 'ng-zorro-antd/select';
import { CommonModule } from '@angular/common';


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
export class PostCarComponent {


  postCarForm!: FormGroup;
  isSpinning: boolean = false;
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  listOfOption: Array<{label:string;value:string}> = [];
  listOfBrands = ['Toyota','Volkswagen','Ford','Honda','Chevrolet','Mercedes-Benz','BMW','Hyundai','Nissan','Kia','Audi','Lexus','Mazda','Renault','Peugeot','Subaru','Volvo','Fiat','Skoda','Tesla'];
  listOfType = ["Petrol","Hybrid","Diesel","Electric","CNG"];
  listOfColor = ["Red", "White","Black","Blue","Green", "Orange", "Gray","Silver"];
  listOfTransmission = ["Manual","Automatic"];

  constructor(private fb: FormBuilder,
    private adminService: AdminService,
    private message: NzMessageService,
    private router: Router) {}

  ngOnInit(){
    this.postCarForm = this.fb.group({
      name: [null,Validators.required],
      brand: [null,Validators.required],
      type: [null,Validators.required],
      color: [null,Validators.required],
      transmission: [null,Validators.required],
      price: [null,Validators.required],
      description: [null,Validators.required],
      year: [null,Validators.required],
    })
  }

  postCar(){
    this.isSpinning = true;
    const formData: FormData = new FormData();
    if (this.selectedFile) {
    formData.append('image', this.selectedFile);
  }
    formData.append('brand',this.postCarForm.get('brand')?.value);
    formData.append('name',this.postCarForm.get('name')?.value);
    formData.append('type',this.postCarForm.get('type')?.value);
    formData.append('color',this.postCarForm.get('color')?.value);
    formData.append('year',this.postCarForm.get('year')?.value);
    formData.append('transmission',this.postCarForm.get('transmission')?.value);
    formData.append('description',this.postCarForm.get('description')?.value);
    formData.append('price',this.postCarForm.get('price')?.value);
    console.log(formData);
    this.adminService.postCar(formData).subscribe((res)=>{
      this.isSpinning = false;
      this.message.success("Car posted succesfully",{nzDuration: 5000});
      this.router.navigateByUrl("/admin/dashboard");
      console.log(res);
    },error => {
      this.message.error("Error while posting car", {nzDuration: 5000});
    })
  }

  onFileSelected(event:any){
    this.selectedFile = event.target.files[0];
    this.previewImage();
  }

  previewImage(){
    const reader = new FileReader();
    reader.onload =() => {
      this.imagePreview = reader.result;
    }
    reader.readAsDataURL(this.selectedFile!);
  }

}
