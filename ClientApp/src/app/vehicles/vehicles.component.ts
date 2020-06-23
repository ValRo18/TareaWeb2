import { Component, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent {

  public vehicles: Vehicle[];
  public vehicle: Vehicle;
  public showForm = false;
  public showFor = false;
  constructor(public http: HttpClient, @Inject('BASE_URL') public baseUrl: string) {
    this.refresh();
  }

  refresh(){
    this.http.get<Vehicle[]>(this.baseUrl + 'api/vehicles').subscribe(result => {
      this.vehicles = result;
      this.vehicle = {
        id:0,
      color: "#000000",
        manufacturer: "",
        year: 2020,
        mileage: 0
      };
      this.showForm = false;
    }, error => console.error(error));
  }
  refresh1(vehicle:Vehicle){
    this.http.get<Vehicle[]>(this.baseUrl + 'api/vehicles').subscribe(result => {
      this.vehicles = result;
      this.vehicle = {
        id:vehicle.id,
      color: vehicle.color,
        manufacturer: vehicle.manufacturer,
        year: vehicle.year,
        mileage:vehicle.mileage
      };
    }, error => console.error(error));
  }
  save() {
    this.http.post(this.baseUrl + 'api/vehicles', this.vehicle).subscribe(() => {
      this.refresh();
    }, error => console.error(error));
  }
  update(vehicle:Vehicle) {
    this.http.put(this.baseUrl+'api/vehicles/'+vehicle.id,vehicle).subscribe(() => {
      this.refresh();
      location.replace("https://localhost:5001/vehicles");
    }, error => console.error(error));
  }

  delete(id:number){
    return this.http.delete(this.baseUrl+ 'api/vehicles/'+ id).subscribe(() => {
      this.refresh();
    }, error => console.error(error));
  }

}
interface Vehicle {
  id:number,
  color: string;
  year: number;
  manufacturer: string;
  mileage: number;
}
