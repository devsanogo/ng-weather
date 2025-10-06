import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {RouterModule} from "@angular/router";
import { ToastrModule } from 'ngx-toastr';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { ServiceWorkerModule } from '@angular/service-worker';

import { AppComponent } from './app.component';
import { ZipcodeEntryComponent } from './zipcode-entry/zipcode-entry.component';
import { ForecastsListComponent } from './forecasts-list/forecasts-list.component';
import { CurrentConditionsComponent } from './current-conditions/current-conditions.component';
import { MainPageComponent } from './main-page/main-page.component';
import {routing} from "./app.routing";
import { environment } from '../environments/environment';
import { GlobalState } from './core/services/global-state/global-state';
import { LocationService } from './core/services/locations/location.service';
import { WeatherService } from './core/services/weather/weather.service';
import { TabsComponent } from './shared/components/tabs/tabs.component';
import { TitleHelperPipe } from './shared/pipes/title-helper.pipe';
import { CacheInterceptor } from './core/interceptors/cache.interceptor';
import { WeatherMockService } from './core/services/weather/weather-mock.service';
import { WEATHER_TOKEN } from './core/models/weather.interface';

@NgModule({
  declarations: [
    AppComponent,
    ZipcodeEntryComponent,
    ForecastsListComponent,
    TabsComponent,
    CurrentConditionsComponent,
    MainPageComponent,
    TitleHelperPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    BrowserAnimationsModule,
    routing,
    ToastrModule.forRoot(),
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    LocationService,
    {
      provide: WEATHER_TOKEN, 
      useClass: environment.isMocked ? WeatherMockService : WeatherService
    },
    GlobalState,
    { provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
