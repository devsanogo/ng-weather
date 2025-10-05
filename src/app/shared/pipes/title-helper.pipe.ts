import { Pipe, PipeTransform } from "@angular/core";
import { ConditionsAndZip } from "app/core/models/conditions-and-zip.type";

@Pipe({
    name: 'titleHelperCase'
})
export class TitleHelperPipe implements PipeTransform {
    transform(locations: ConditionsAndZip[]): string[] {
        return locations.map(loc => `${loc.data.name } (${loc.zip })`);
    }
}