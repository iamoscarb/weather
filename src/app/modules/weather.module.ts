import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherComponent } from './weather/weather.component';
import { SharedModule } from '../shared/shared.module';
import { WeatherRoutingModule } from './weather-routing.module';
import { ErrorMessageComponent } from './error-message/error-message.component';



@NgModule({
  declarations: [
    WeatherComponent,
    ErrorMessageComponent
  ],
  imports: [
    CommonModule,
    WeatherRoutingModule,
    SharedModule  ]
})
export class WeatherModule { }
