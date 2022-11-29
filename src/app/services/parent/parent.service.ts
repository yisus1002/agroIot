import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ParentService {

  public API_URL: string = 'https://iot-restserver-production.up.railway.app/';
  constructor() { }
}
