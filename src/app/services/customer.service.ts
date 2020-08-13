import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer.model';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private httpService: HttpClient) { }


  public getAllCustomers(): Observable<any> {
    return this.httpService.get<any>('assets/customers.txt', { responseType: 'text' as 'json' });


  }
}

