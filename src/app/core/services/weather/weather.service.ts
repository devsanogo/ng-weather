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

@Injectable()
export class WeatherService implements WeatherInterface {
  private readonly globalState = inject(GlobalState);
  private readonly _currentConditions = signal<ConditionsAndZip[]>([]);
  public readonly currentConditions = this._currentConditions.asReadonly();
  public locations : string[] = [];

  constructor(private http: HttpClient) {
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

  private inRange(num: number, min: number, max: number): boolean {
    return num >= min && num <= max;
  }

  getWeatherIcon(id: number): string {

    const iconWeatherMap = new Map([
      [[200, 232], CONSTANTS.ICON_URL + "art_storm.png"],
      [[501, 511], CONSTANTS.ICON_URL + "art_rain.png"],
      [[520, 531], CONSTANTS.ICON_URL + "art_light_rain.png"],
      [[600, 622], CONSTANTS.ICON_URL + "art_snow.png"],
      [[801, 804], CONSTANTS.ICON_URL + "art_clouds.png"],
      [[741, 761], CONSTANTS.ICON_URL + "art_fog.png"],
    ])
    let iconName = '';
    // console.log('ID > ', id);

    for (let [k, v] of iconWeatherMap.entries()) {
      // console.log('ISR > ', this.inRange(id, k[0], k[1]))
      if (this.inRange(id, k[0], k[1])) {
        iconName = v;
        // break;
      }
    }

    // console.log('IC > ', iconName);

    if (id >= 200 && id <= 232)
      return CONSTANTS.ICON_URL + "art_storm.png";
    else if (id >= 501 && id <= 511)
      return CONSTANTS.ICON_URL + "art_rain.png";
    else if (id === 500 || (id >= 520 && id <= 531))
      return CONSTANTS.ICON_URL + "art_light_rain.png";
    else if (id >= 600 && id <= 622)
      return CONSTANTS.ICON_URL + "art_snow.png";
    else if (id >= 801 && id <= 804)
      return CONSTANTS.ICON_URL + "art_clouds.png";
    else if (id === 741 || id === 761)
      return CONSTANTS.ICON_URL + "art_fog.png";
    else
      return CONSTANTS.ICON_URL + "art_clear.png";
  }

}
