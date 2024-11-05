import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Location } from '../interfaces/location';

@Injectable({
  providedIn: 'root',
})
export class LocationsService {
  private httpClient = inject(HttpClient);

  getAllLocations(center: { lat: number; lng: number }) {
    const url = 'https://api.nicobytes.store/api/v1/locations';
    return this.httpClient.get<Location[]>(url, { params: {
      origin: `${center.lat},${center.lng}`,
    } });
  }

  constructor() {}
}
