import { Injectable } from "@angular/core";
import { BehaviorSubject, ReplaySubject } from "rxjs";
import { currentConditionActionType } from "app/core/models/conditions-and-zip.type";

@Injectable()
export class GlobalState {
    private readonly _data$ = new ReplaySubject<currentConditionActionType>();
    private readonly _locations$ = new BehaviorSubject<string[]>([]);

    readonly data = this._data$.asObservable();
    readonly locations = this._locations$.asObservable();

    notifyDataCurrentConditions(data: currentConditionActionType) {
        this._data$.next(data);
    }

    setLocations(locations: string[]) {
        this._locations$.next(locations);
    }
}