import { Component, OnInit } from '@angular/core';
import { WeatherService } from './service/weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'Weather App';
  public place: string = '';

  constructor(private service: WeatherService) { }

  ngOnInit(): void {
    navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => {
      console.log(position);

      this.service.getWeather({ lat: position.coords.latitude, lon: position.coords.longitude, appid: 'ff3b1762cf5162ba36b388f1d5bf1993' }).subscribe(
        (res: any) => {
          if (res.cod == 200) {
            this.place = res.name;
            console.log(res);

          } else {
            console.log('error');
          }
        }
      );
    });
  }


}
