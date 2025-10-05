import { CurrentConditions } from "./current-conditions.type";

export interface ConditionsAndZip {
    zip: string;
    data: CurrentConditions;
}

export type currentConditionActionType = { action: 'add' | 'remove', data: string }