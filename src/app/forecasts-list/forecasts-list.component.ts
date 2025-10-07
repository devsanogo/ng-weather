import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { WEATHER_TOKEN } from 'app/core/models/weather.interface';

@Component({
  selector: 'app-forecasts-list',
  templateUrl: './forecasts-list.component.html',
  styleUrls: ['./forecasts-list.component.css']
})
export class ForecastsListComponent {  
  private readonly route = inject(ActivatedRoute);
  protected readonly weatherService = inject(WEATHER_TOKEN);
  protected readonly forecast$ = this.route.params.pipe(switchMap((params) => this.weatherService.getForecast(params['zipcode'])));
}
