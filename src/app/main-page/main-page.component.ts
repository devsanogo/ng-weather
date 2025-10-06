import { Component, OnInit, inject } from '@angular/core';
import { CONSTANTS } from 'app/core/models/constant';
import { GlobalState } from 'app/core/services/global-state/global-state';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html'
})
export class MainPageComponent implements OnInit {
  locations: string[] = [];
  private readonly globalState = inject(GlobalState);

  ngOnInit(): void {
    let locString = localStorage.getItem(CONSTANTS.locations);

    if (locString) {
      this.locations = JSON.parse(locString);
    }

    // load all locations
    for (let loc of this.locations) {
      this.globalState.notifyDataCurrentConditions({ action: 'add', data: loc });
    }
  }
}
