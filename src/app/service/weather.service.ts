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
  private paramDefault = { appid: this.APIKey, units: 'metric', lang: 'es' }

  getWeather(data: any): Observable<any> {
    const params = { ...data, ... this.paramDefault }
    return this.get(`weather`, { params: params });
  }

  getWeatherForecast(data: any): Observable<any> {
    const params = { ...data, ... this.paramDefault }
    return this.get(`forecast`, { params: params });
  }
}
