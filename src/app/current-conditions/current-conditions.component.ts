import { Component, inject, Signal } from '@angular/core';
import { Router } from "@angular/router";
import { ConditionsAndZip } from 'app/core/models/conditions-and-zip.type';
import { WEATHER_TOKEN } from 'app/core/models/weather.interface';

@Component({
  selector: 'app-current-conditions',
  templateUrl: './current-conditions.component.html',
  styleUrls: ['./current-conditions.component.css']
})
export class CurrentConditionsComponent {

  private router = inject(Router);
  protected weatherService = inject(WEATHER_TOKEN);
  protected currentConditionsByZip: Signal<ConditionsAndZip[]> = this.weatherService.currentConditions;

  showForecast(zipcode : string) {
    this.router.navigate(['/forecast', zipcode])
  }

}
