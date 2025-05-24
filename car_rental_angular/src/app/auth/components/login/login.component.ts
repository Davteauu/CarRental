import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive} from '@angular/router';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth/auth.service';
import { StorageService } from '../../services/storage/storage.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';
import { NgZorroImportsModule } from '../../../NgZorroImportsModule';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    NgZorroImportsModule,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  isSpinning: boolean = false;
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private message: NzMessageService) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required]]
    })
  }
  login() {
    console.log(this.loginForm.value);
    this.authService.login(this.loginForm.value).subscribe((res) => {
      console.log(res);
      if (res.userId != null) {
        const user = {
          id: res.userId,
          role:res.userRole
        }
        StorageService.saveUser(user);
        StorageService.saveToken(res.jwt);
        if (StorageService.isAdminLoggedIn()) {
          this.router.navigateByUrl("/admin/dashboard");
        }
        else if (StorageService.isCustomerLoggedIn()) {
          this.router.navigateByUrl("/customer/dashboard");
        }
        else {
          this.message.error("Bad credentials", { nzDuration: 5000 });
        }
      }
    })
  }
}
