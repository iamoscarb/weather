import { Injectable } from '@angular/core';
import { ApiHttpService } from './api-http.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService extends ApiHttpService {

  override api = 'https://api.openweathermap.org/data/2.5/';
  override domain = '';

  getWeather(data: any):Observable<any>{
    return this.get(`weather?lat=${data.lat}&lon=${data.lon}&appid=${data.appid}`)
  }
}
