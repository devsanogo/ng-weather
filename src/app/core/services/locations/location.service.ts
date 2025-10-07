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
    this.globalState.setLocations(this.locations);
  }

  addLocation(zipcode : string) {
    if (!this.locations.includes(zipcode)) {
      this.locations.push(zipcode);
    }

    // Notify to add zipcode & locations in local store
    this.globalState.notifyDataCurrentConditions({ action: 'add', data: zipcode });
    this.globalState.setLocations(this.locations);
  }

  removeLocation(zipcode : string) {
    let index = this.locations.indexOf(zipcode);
    if (index !== -1) {
      this.locations.splice(index, 1);
      this.globalState.setLocations(this.locations);
    }

    // Notify store to remove zipcode
    this.globalState.notifyDataCurrentConditions({ action: 'remove', data: zipcode });
  }
}
