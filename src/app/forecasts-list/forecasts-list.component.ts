import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { WeatherService } from 'app/core/services/weather/weather.service';

@Component({
  selector: 'app-forecasts-list',
  templateUrl: './forecasts-list.component.html',
  styleUrls: ['./forecasts-list.component.css']
})
export class ForecastsListComponent {  
  private readonly route = inject(ActivatedRoute);
  private readonly weatherService = inject(WeatherService);
  protected readonly forecast$ = this.route.params.pipe(switchMap((params) => this.weatherService.getForecast(params['zipcode'])));
}
