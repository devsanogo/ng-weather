import { Pipe, PipeTransform } from "@angular/core";
import { ConditionsAndZip } from "app/core/models/conditions-and-zip.type";

@Pipe({
    name: 'titleHelperCase'
})
export class TitleHelperPipe implements PipeTransform {
    transform(locations: ConditionsAndZip[]): string[] {
        return Array.from(new Set(locations.map(loc => `${loc.data.name } (${loc.zip })`)));
    }
}