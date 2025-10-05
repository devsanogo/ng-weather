import { Component, inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LocationService } from 'app/core/services/locations/location.service';

@Component({
  selector: 'app-zipcode-entry',
  templateUrl: './zipcode-entry.component.html'
})
export class ZipcodeEntryComponent {

  private readonly service = inject(LocationService);

  addLocation(zipForm: NgForm): void {
    this.service.addLocation(zipForm.value.zipcode);
    zipForm.reset();
  }

}
