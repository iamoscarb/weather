import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../service/weather.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ErrorMessageComponent } from '../error-message/error-message.component';

@Component({
  selector: 'app-weather',
  standalone: false,
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.scss',
})

export class WeatherComponent implements OnInit {

  showIcon: boolean = false;
  public place: string = '';
  public weatherInfo: any = { place: '', temp: 0, minTemp: 0, maxTemp: 0, desp: 0, senceTemp: 0, icon: '', bg: '' };

  weatherForm = new FormGroup({
    city: new FormControl('', Validators.required)
  })

  constructor(private service: WeatherService, public _dialog: MatDialog) { }

  ngOnInit(): void {
    navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => {
      this.service.getWeather({ lat: position.coords.latitude, lon: position.coords.longitude, appid: 'ff3b1762cf5162ba36b388f1d5bf1993' }).subscribe(
        (res: any) => {
          if (res.cod === 200) {
            this.setData(res)
          } else {
            this.errorMessage();
          }
        }, error => {
          this.errorMessage();
        }
      );
    });
  }

  getWeatherCity() {
    if (this.weatherForm.get('city')?.getRawValue() !== '') {
      this.service.getCityWeather({ city: this.weatherForm.get('city')?.getRawValue() }).subscribe(
        (res: any) => {
          if (res.cod === 200) {
            this.setData(res);
          } else {
            this.errorMessage();
          }
        }, (error) => {
          this.errorMessage();
        }
      );
    }
  }

  setData(res: any) {
    this.weatherInfo.place = res.name;
    this.weatherInfo.temp = res.main.temp - 273.15;
    this.weatherInfo.minTemp = res.main.temp_min - 273.15;
    this.weatherInfo.maxTemp = res.main.temp_max - 273.15;
    this.weatherInfo.desp = res.weather[0].description;
    this.weatherInfo.senceTemp = res.main.feels_like - 273.15;
    this.weatherInfo.icon = `assets/images/icons/${res.weather[0].icon}.png`;
    this.weatherInfo.bg = `_${res.weather[0].icon}`;
    this.showIcon = true;
  }

  errorMessage() {
    this._dialog.open(ErrorMessageComponent, {
      width: '450px',
      data: {
        title: 'Error',
        message: 'No se pudo encontrar la Ciudad ingresada'
      }
    });
  }

}
