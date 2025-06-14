import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from '../../../auth/services/storage/storage.service';

const BASIC_URL = "http://localhost:8080";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http:HttpClient) { }

  getAllCars(): Observable<any> {
      return this.http.get(BASIC_URL + "/api/customer/cars", {
        headers: this.createAuthorizationHeader()
      });
  }


  createAuthorizationHeader(): HttpHeaders {
      let authheaders: HttpHeaders = new HttpHeaders();
      return authheaders.set(
        'Authorization',
        'Bearer ' + StorageService.getToken()
      )
    }
}
