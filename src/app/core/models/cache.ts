import { Observable } from "rxjs"

export interface CacheEntry<T> {
    lastUpdated: Date,
    data: Observable<T>
}

export interface CacheData {
    [key: string]: CacheEntry<unknown> 
}