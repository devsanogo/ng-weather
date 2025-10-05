import {Injectable, inject, signal} from '@angular/core';
import {Observable, of} from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

import { GlobalState } from '../global-state/global-state';
import { ConditionsAndZip, currentConditionActionType } from 'app/core/models/conditions-and-zip.type';
import { CurrentConditions } from 'app/core/models/current-conditions.type';
import { CONSTANTS, forecastListMock } from 'app/core/models/constant';
import { Forecast } from 'app/core/models/forecast.type';
import { CacheService } from '../cache/cache.service';


@Injectable()
export class WeatherService {
  private readonly globalState = inject(GlobalState);
  private readonly _currentConditions = signal<ConditionsAndZip[]>([]);
  public readonly currentConditions = this._currentConditions.asReadonly();
  readonly cacheService = inject(CacheService);

  constructor(private http: HttpClient) {
    this.globalState.data.pipe(
      switchMap((value: currentConditionActionType) => value.action === 'add' ? this.addCurrentConditions(value.data) : this.removeCurrentConditions(value.data))
    ).subscribe()
  }

  addCurrentConditions(zipcode: string): Observable<any> {
    // Here we make a request to get the current conditions data from the API. Note the use of backticks and an expression to insert the zipcode
    const url = `${CONSTANTS.weather.URL}/weather?zip=${zipcode},us&units=imperial&APPID=${CONSTANTS.weather.APPID}`;

    // return this.http.get<CurrentConditions>(url).pipe(
    //   tap((data) => {
    //     console.log('CDATA > ', data)
    //     this._currentConditions.update(conditions => [...conditions, {zip: zipcode, data}])
    //   })
    // );

    return this.http.get<CurrentConditions>('assets/weather.json').pipe(
      tap((data) => {
        this._currentConditions.update(conditions => [...conditions, {zip: zipcode, data}])
      })
    )
  }

  removeCurrentConditions(zipcode: string): Observable<any> {
    this._currentConditions.update(conditions => {
      for (let i in conditions) {
        if (conditions[i].zip == zipcode)
          conditions.splice(+i, 1);
      }
      return conditions;
    })

    return of({});
  }

  getForecast(zipcode: string): Observable<Forecast> {
    // Here we make a request to get the forecast data from the API. Note the use of backticks and an expression to insert the zipcode
    return of(forecastListMock)
    // return this.http.get<Forecast>(`${CONSTANTS.weather.URL}/forecast/daily?zip=${zipcode},us&units=imperial&cnt=5&APPID=${CONSTANTS.weather.APPID}`);
  }

  getWeatherIcon(id: number): string {
    if (id >= 200 && id <= 232)
      return CONSTANTS.weather.ICON_URL + "art_storm.png";
    else if (id >= 501 && id <= 511)
      return CONSTANTS.weather.ICON_URL + "art_rain.png";
    else if (id === 500 || (id >= 520 && id <= 531))
      return CONSTANTS.weather.ICON_URL + "art_light_rain.png";
    else if (id >= 600 && id <= 622)
      return CONSTANTS.weather.ICON_URL + "art_snow.png";
    else if (id >= 801 && id <= 804)
      return CONSTANTS.weather.ICON_URL + "art_clouds.png";
    else if (id === 741 || id === 761)
      return CONSTANTS.weather.ICON_URL + "art_fog.png";
    else
      return CONSTANTS.weather.ICON_URL + "art_clear.png";
  }

}
