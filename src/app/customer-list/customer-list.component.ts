import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../services/customer.service';
import { Customer } from '../models/customer.model';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  customers: Customer[] = [];
  invitedCustomers: Customer[] = [];
  officeLocation: Object = { "latitude": 53.339428, "longitude": -6.257664 };
  RADIUS_OF_EARTH_IN_KM = 6371;
  fileUrl;



  constructor(private customerService: CustomerService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.getAllCustomers();
  }


  getAllCustomers() {
    this.customerService.getAllCustomers().subscribe(response => {
      let lines = response.split('\n');
      lines.forEach(element => this.customers.push(JSON.parse(element)));
      this.customers.sort((a, b) => (a.user_id > b.user_id) ? 1 : ((b.user_id > a.user_id) ? -1 : 0));

    });
  }


  /**
   * @param  {object} officeCoordinates
   * @param  {object} users
   * return list of customers with location within 100 from officeCoordinates
   */
  calculateCustomerLocation(officeCoordinates, users) {
    const toRadian = angle => (Math.PI / 180) * angle;
    const distance = (a, b) => (Math.PI / 180) * (a - b);

    this.invitedCustomers = users.filter(element => {

      let dLat = distance(element.latitude, officeCoordinates.latitude);
      let dLon = distance(element.longitude, officeCoordinates.longitude);
      let a = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(dLat / 2), 2) + Math.pow(Math.sin(dLon / 2), 2) * Math.cos(toRadian(officeCoordinates.latitude)) * Math.cos(toRadian(element.latitude))));
      let finalDistance = this.RADIUS_OF_EARTH_IN_KM * a;

      return finalDistance <= 100;
    })
      .map(element => [{ "UserID": element.user_id, "customerName": element.name }])
      .sort((a, b) => (a.UserID > b.UserID) ? 1 : ((b.UserID > a.UserID) ? -1 : 0))
    this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(new Blob([JSON.stringify(this.invitedCustomers)], { type: 'application/octet-stream' })));


  }






}
