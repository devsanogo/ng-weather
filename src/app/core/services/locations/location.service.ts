import { Injectable, inject } from '@angular/core';
import { GlobalState } from '../global-state/global-state';
import { CONSTANTS } from 'app/core/models/constant';

@Injectable()
export class LocationService {

  locations : string[] = [];
  private readonly globalState = inject(GlobalState);

  constructor() {
    let locString = localStorage.getItem(CONSTANTS.locations);

    if (locString) {
      this.locations = JSON.parse(locString);
    }

    for (let loc of this.locations) {
      this.globalState.notifyDataCurrentConditions({ action: 'add', data: loc });
    }
  }

  addLocation(zipcode : string) {
    this.locations.push(zipcode);
    localStorage.setItem(CONSTANTS.locations, JSON.stringify(this.locations));
    this.globalState.notifyDataCurrentConditions({ action: 'add', data: zipcode });
  }

  removeLocation(zipcode : string) {
    let index = this.locations.indexOf(zipcode);
    if (index !== -1) {
      this.locations.splice(index, 1);
      localStorage.setItem(CONSTANTS.locations, JSON.stringify(this.locations));
      this.globalState.notifyDataCurrentConditions({ action: 'remove', data: zipcode });
    }

    this.globalState.notifyDataCurrentConditions({ action: 'remove', data: zipcode });
  }
}
