import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { CacheData, CacheEntry } from "app/core/models/cache";
import { environment } from "environments/environment";
import { HttpResponse } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class CacheService {
    readonly cache: CacheData = {};
    readonly MAX_CACHE_AGE = environment.cacheDuration; // in milliseconds

    constructor() {}

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
     * Gets the cached entry for the specified request.
     * @param url The request URL.
     * @return The cache entry or null if no cache entry exists for this request.
     */
    getCacheEntry<T>(url: string): CacheEntry<unknown> | null {
        return JSON.parse(localStorage.getItem(url) as string) || null;
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
        console.log('EQ > ', new Date().getTime() - new Date(cache.lastUpdated).getTime());
        return new Date().getTime() - new Date(cache.lastUpdated).getTime() > environment.cacheDuration;
    }

    /**
     * Cleans cache entries older than the max timelife of data in cache.
     */
    cleanCacheIfExpired(dataKey?: string): void {
        if (dataKey) {
            localStorage.removeItem(dataKey);
        }

        const localUrlKeys = Object.keys(localStorage).filter(loc => loc.startsWith('https'));
        const cacheUrlsStorage = localUrlKeys.map(key => ({ key, data: JSON.parse(localStorage.getItem(key) as string) }));

        Object.entries(cacheUrlsStorage).forEach(([key, value]) => {
            if (new Date().getTime() - new Date(value.data.lastUpdated).getTime() > environment.cacheDuration) {
                localStorage.removeItem(value.key);
            }
        })
    }
}