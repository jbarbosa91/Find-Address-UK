import { Component } from '@angular/core';
import { AddressService } from './address.service';
import { HistoryService } from './history.service';
import { faPlane } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  faPlane = faPlane;

  selectedAddress: any;

  meters: any;

  miles: any;

  input: any;

  state = true;

  showMiles = false;

  unity = "miles";

  constructor(private address: AddressService, private history: HistoryService){}

  changeUnit(): void {
    if (this.showMiles){
      this.showMiles = false;
      this.unity = "miles"
      return;
    }
    this.showMiles = true;
    this.unity = "km";
  }

  search(term:string): void {
    this.input = term;
    this.address.getData(term).subscribe({
      next: data => {
      this.selectedAddress = data; this.history.add(this.selectedAddress.postcode); this.state=true; this.calculate(); return;},
      error: () => {this.state = false}});
  }
  calculate(): void {
    const lat1 = 51.4700223;
    const lon1 = -0.4542955;
    const R = 6371e3; // metres
    const φ1 = lat1 * Math.PI/180; // φ, λ in radians
    const φ2 = this.selectedAddress.latitude * Math.PI/180;
    const Δφ = (this.selectedAddress.latitude-lat1) * Math.PI/180;
    const Δλ = (this.selectedAddress.longitude-lon1) * Math.PI/180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
          Math.cos(φ1) * Math.cos(φ2) *
          Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    const d = R * c; // in metres
    this.meters = Math.round(d/1000);
    this.miles = Math.round(this.meters * 0.6);
  }
}