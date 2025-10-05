import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";
import { currentConditionActionType } from "app/core/models/conditions-and-zip.type";

@Injectable()
export class GlobalState {
    private _data$ = new ReplaySubject<currentConditionActionType>();
    public data = this._data$.asObservable();

    notifyDataCurrentConditions(data: currentConditionActionType) {
        this._data$.next(data);
    }
}