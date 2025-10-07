import {Injectable, inject, signal} from '@angular/core';
import {Observable, of} from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

import { GlobalState } from '../global-state/global-state';
import { ConditionsAndZip, currentConditionActionType } from 'app/core/models/conditions-and-zip.type';
import { CurrentConditions } from 'app/core/models/current-conditions.type';
import { CONSTANTS } from 'app/core/models/constant';
import { Forecast } from 'app/core/models/forecast.type';
import { environment } from 'environments/environment';
import { WeatherInterface } from 'app/core/models/weather.interface';
import { __getIcon } from 'app/shared/utils';

@Injectable()
export class WeatherService implements WeatherInterface {
  private readonly globalState = inject(GlobalState);
  private readonly _currentConditions = signal<ConditionsAndZip[]>([]);
  public readonly currentConditions = this._currentConditions.asReadonly();
  public locations : string[] = [];

  constructor(private http: HttpClient) {
    // Listen store and call addCurrentConditions() & removeCurrentConditions() when store is updated
    this.globalState.data.pipe(
      switchMap((value: currentConditionActionType) => value.action === 'add' ? this.addCurrentConditions(value.data) : this.removeCurrentConditions(value.data))
    ).subscribe()

    this.globalState.locations.pipe(tap((locations) => this.locations = locations)).subscribe()
  }

  addCurrentConditions(zipcode: string): Observable<CurrentConditions> {
    // Here we make a request to get the current conditions data from the API. Note the use of backticks and an expression to insert the zipcode
    const url = `${environment.weather.URL}/weather?zip=${zipcode},us&units=imperial&APPID=${environment.weather.APPID}`;
    return this.http.get<CurrentConditions>(url).pipe(
      tap((data) => {
        if (this.locations) {
          localStorage.setItem(CONSTANTS.locations, JSON.stringify(this.locations));
        }
        this._currentConditions.update(conditions => [...conditions, {zip: zipcode, data}])
      })
    );
  }

  removeCurrentConditions(zipcode: string): Observable<any> {
    this._currentConditions.update(conditions => {
      for (let i in conditions) {
        if (conditions[i].zip == zipcode)
          conditions.splice(+i, 1);
      }

      if (this.locations) {
        localStorage.setItem(CONSTANTS.locations, JSON.stringify(this.locations));
      }

      return conditions;
    })

    return of({});
  }

  getForecast(zipcode: string): Observable<Forecast> {
    // Here we make a request to get the forecast data from the API. Note the use of backticks and an expression to insert the zipcode    
    const url = `${environment.weather.URL}/forecast/daily?zip=${zipcode},us&units=imperial&cnt=5&APPID=${environment.weather.APPID}`;
    return this.http.get<Forecast>(`${url}`);
  }

  getWeatherIcon(id: number): string {
    return __getIcon(id);
  }

}
