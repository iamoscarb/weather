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
  public weatherInfo: any = { place: '', temp: 0, minTemp: 0, maxTemp: 0, desp: '', senceTemp: 0, date: '00 de 00, 00', time: '20:00', icon: 'assets/images/icons/01d.png', bg: '_01d' };
  public weatherForecastData: any = [];
  public weatherData: any[] = [];


  weatherForm = new FormGroup({
    city: new FormControl('', Validators.required)
  })

  constructor(private service: WeatherService, public _dialog: MatDialog) { }

  ngOnInit(): void {
   navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => {
      this.getWeatherData({ lat: position.coords.latitude, lon: position.coords.longitude });
    });

  }

  getWeatherCity() {
    this.getWeatherData({ q: this.weatherForm.get('city')?.getRawValue() })
  }

  getWeatherData(body: any) {
    if (this.weatherForm.get('city')?.getRawValue() !== '' || (body.lat && body.lon)) {
      this.service.getWeather(body).subscribe(
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

  getForecastData(lat: number, lon: number) {
    let body = { lat, lon, cnt: 8 }
    this.service.getWeatherForecast(body).subscribe(
      (res: any) => {
        if (Number(res.cod) === 200) {
          this.setForecastData(res);
        } else {
          this.errorMessage();
        }
      }, (error) => {
        this.errorMessage();
      }
    );

  }

  setData(res: any) {
    const { main, weather, dt, sys, name, wind, timezone, visibility, coord } = res;
    const clima = weather[0];
    this.weatherInfo = {
      place: name,
      temp: main.temp,
      minTemp: main.temp_min,
      maxTemp: main.temp_max,
      desp: clima.description,
      senceTemp: main.feels_like,
      date: this.formateDate(dt, timezone),
      time: this.formateHour(dt, timezone),
      icon: `assets/images/icons/${clima.icon}.png`,
      bg: `_${clima.icon}`
    }

    this.weatherData = [
      { title: 'Humedad', value: `${main.humidity}%`, icon: 'fa-solid fa-droplet' },
      { title: 'Aire', value: `${this.formatAir(wind.speed)} km/h`, icon: 'fa-solid fa-wind' },
      { title: 'Amanecer', value: this.formateHour(sys.sunrise, timezone), icon: 'fa-solid fa-sun' },
      { title: 'Atardecer', value: this.formateHour(sys.sunset, timezone), icon: 'fa-solid fa-moon' },
      { title: 'Visibilidad', value: `${visibility / 1000} km`, icon: 'fa-solid fa-eye' },
      { title: 'Presión', value: `${main.pressure} mb`, icon: 'fa-solid fa-down-left-and-up-right-to-center' }
    ]
    this.showIcon = true;
    this.getForecastData(coord.lat, coord.lon);
  }

  setForecastData(res: any) {
    this.weatherForecastData = res.list.map((obj: any) => {
      let { dt, main, weather } = obj;
      return { time: this.formatSingleHour(dt), temp: `${main.temp.toFixed(0)}°`, icon: `assets/images/icons/${weather[0].icon}.png` }
    });

    console.table(this.weatherForecastData)
  }

  errorMessage() {
    this._dialog.open(ErrorMessageComponent, {
      width: '450px',
      data: {
        title: 'Error',
        message: 'La tarea no se pudo completar con la Ciudad ingresada'
      }
    });
  }

  formateDate(dt: number, timeZone: number) {
    console.log(timeZone);
    const fecha = new Date(dt * 1000);
    const dateOptions: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }
    return fecha.toLocaleDateString('es-MX', dateOptions);
  }

  formateHour(dt: number, timeZone: number) {
    const localMillis = Date.now() + timeZone * 1000;
    const fecha = new Date(dt * 1000);
    const hourOption: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }
    return fecha.toLocaleTimeString('es-MX', hourOption);
  }

  formatSingleHour(dt: number){
    const fecha = new Date(dt * 1000);
    const hourOption: Intl.DateTimeFormatOptions = {
      hour: 'numeric',
      hour12: true
    }
    return fecha.toLocaleTimeString('es-MX', hourOption);
  }

  formatAir(air: number) {
    let value = air * 3.6;
    return value.toFixed(1)
  }

}

