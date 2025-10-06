import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { HttpResponse } from "@angular/common/http";
import { environment } from "environments/environment";

@Injectable({
    providedIn: 'root'
})
export class CacheService {
    readonly MAX_CACHE_AGE = environment.cacheDuration; // in milliseconds

    put<T>(url: string, data: T, lastUpdated?: Date): void {
        if (!localStorage.getItem(url)) {
            localStorage.setItem(url, JSON.stringify({ lastUpdated: lastUpdated || new Date(), data }));
        }

        console.log(`Cache set for key: "${url}"`);
    }

    hasKey(key: string): boolean {
        return !!JSON.parse(localStorage.getItem(key) as string);
    }

    /**
     * Gets the cached data for the specified request.
     * @param url The request URL.
     * @return The cached data or null if no cached data exists for this request.
     */
    get<T>(url: string): Observable<unknown> {
        const cacheEntry = JSON.parse(localStorage.getItem(url) as string);
        if (cacheEntry) {
            console.log(`Cache hit for key: "${url}"`);
            return of(new HttpResponse({ body: cacheEntry.data.body }));
        }
        return of((null as unknown) as T);
    }

    /**
     * Clears the cached entry (if exists) for the specified request.
     * @param url The request URL.
     */
    clearCache(url: string): void {
        localStorage.removeItem(url);
        console.log(`Cache cleared for key: "${url}"`);
    }

    checkIfCacheIsExpired(key: string): boolean {
        const cache = JSON.parse(localStorage.getItem(key) as string);
        console.log('TTL > ', new Date().getTime() - new Date(cache.lastUpdated).getTime());
        return new Date().getTime() - new Date(cache.lastUpdated).getTime() > environment.cacheDuration;
    }

}