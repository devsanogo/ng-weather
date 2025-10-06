import { Observable } from "rxjs";
import { InjectionToken, Signal } from "@angular/core";
import { CurrentConditions } from "./current-conditions.type";
import { Forecast } from "./forecast.type";
import { ConditionsAndZip } from "./conditions-and-zip.type";

export const WEATHER_TOKEN = new InjectionToken<WeatherInterface>('weather_token');

export interface WeatherInterface {
    currentConditions: Signal<ConditionsAndZip[]>;
    addCurrentConditions(zipcode?: string): Observable<CurrentConditions>;
    removeCurrentConditions(zipcode?: string): Observable<any>;
    getForecast(zipcode?: string): Observable<Forecast>;
    getWeatherIcon(id: number): string;
}