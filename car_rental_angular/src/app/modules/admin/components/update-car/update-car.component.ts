import { Component } from '@angular/core';
import { AdminService } from '../../service/admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NzOptionComponent } from 'ng-zorro-antd/select';
import { NgZorroImportsModule } from '../../../../NgZorroImportsModule';
import { NzMessageComponent, NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-update-car',
  imports: [
    NzOptionComponent,
    NgZorroImportsModule,  
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './update-car.component.html',
  styleUrl: './update-car.component.scss'
})
export class UpdateCarComponent {

  isSpinning = false;
  carId!: number;
  imgChanged: boolean = false;
  selectedFile:any;
  imagePreview: string | ArrayBuffer | null = null;
  existingImage: string | null = null;
  updateForm!: FormGroup;
  listOfOption: Array<{label:string;value:string}> = [];
  listOfBrands = ['Toyota','Volkswagen','Ford','Honda','Chevrolet','Mercedes-Benz','BMW','Hyundai','Nissan','Kia','Audi','Lexus','Mazda','Renault','Peugeot','Subaru','Volvo','Fiat','Skoda','Tesla'];;
  listOfType = ["Petrol","Hybrid","Diesel","Electric","CNG"];
  listOfColor = ["Red", "White","Black","Blue","Green", "Orange", "Gray","Silver"];
  listOfTransmission = ["Manual","Automatic"];

  constructor(
    private adminService: AdminService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private message:NzMessageService,
    private router:Router) {}

  ngOnInit() {
    
    this.carId = +this.activatedRoute.snapshot.params['id'];
    this.updateForm = this.fb.group({
      name: [null,Validators.required],
      brand: [null,Validators.required],
      type: [null,Validators.required],
      color: [null,Validators.required],
      transmission: [null,Validators.required],
      price: [null,Validators.required],
      description: [null,Validators.required],
      year: [null,Validators.required],
    })
    this.getCarById();
  }

  getCarById() {
    this.isSpinning=true;
    this.adminService.getCarById(this.carId).subscribe((res) => {
      this.isSpinning=false;
      const carDto = res;
      this.existingImage = "data:image/jpeg;base64," + res.returnedImage;
      this.updateForm.patchValue(carDto); 
    });
  }

  updateCar(){
    this.isSpinning = true;
    const formData: FormData = new FormData();
    if (this.selectedFile && this.imgChanged)  {
      formData.append('image', this.selectedFile);
    }
    formData.append('brand',this.updateForm.get('brand')?.value);
    formData.append('name',this.updateForm.get('name')?.value);
    formData.append('type',this.updateForm.get('type')?.value);
    formData.append('color',this.updateForm.get('color')?.value);
    formData.append('year',this.updateForm.get('year')?.value);
    formData.append('transmission',this.updateForm.get('transmission')?.value);
    formData.append('description',this.updateForm.get('description')?.value);
    formData.append('price',this.updateForm.get('price')?.value);
    console.log(formData);
    this.adminService.updateCar(this.carId, formData).subscribe((res)=>{
      this.isSpinning = false;
      this.message.success("Car updated succesfully",{nzDuration: 5000});
      this.router.navigateByUrl("/admin/dashboard");
      console.log(res);
    },error => {
      this.message.error("Error while updating car", {nzDuration: 5000});
    })
  }

  onFileSelected(event:any){
    this.selectedFile = event.target.files[0];
    this.imgChanged = true;
    this.existingImage = null;
    this.previewImage();
  }

  previewImage(){
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result
    }
    reader.readAsDataURL(this.selectedFile);
  }
}
