import { Injectable } from '@angular/core';
import { ApiHttpService } from './api-http.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService extends ApiHttpService {
  APIKey: string = '6492527f849e5034d485df6b5981d407';

  override api = 'https://api.openweathermap.org/data/2.5/';
  override domain = '';

  getWeather(data: any): Observable<any> {
    return this.get(`weather?lat=${data.lat}&lon=${data.lon}&appid=${this.APIKey}`)
  }

  getCityWeather(data: any): Observable<any> {
    return this.get(`weather?q=${data.city}&appid=${this.APIKey}`)
  }
}
