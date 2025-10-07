import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, ReplaySubject } from "rxjs";
import { ToastrService } from "ngx-toastr";
import { CacheService } from "../services/cache/cache.service";

@Injectable({
    providedIn: 'root',
})
export class CacheInterceptor implements HttpInterceptor {
    constructor(private readonly cacheService: CacheService, private toastr: ToastrService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.method === 'GET') {
            return this.cacheable(() => next.handle(req), req.urlWithParams);
        } else {
            // Remove cache
            this.cacheService.clearCache(req.urlWithParams);
            return next.handle(req);
        }
    }

    private cacheable<T>(returnObservable: () => Observable<T>, key: string): Observable<T> {

        // Clear cache if cache is expired
        if (this.cacheService.hasKey(key) && this.cacheService.checkIfCacheIsExpired(key)) {
            this.cacheService.clearCache(key);
        }

        // Return cached data if cache is not expired
        if (this.cacheService.hasKey(key) && !this.cacheService.checkIfCacheIsExpired(key)) {
            return this.cacheService.get(key) as Observable<T>;
        }

        const replay = new ReplaySubject<T>(1);

        // makes request if cache is expired and store the new request data in cache
        returnObservable().subscribe(
            (x) => replay.next(x),
            (x) => replay.error(x),
            () => replay.complete()
        );

        const observable = replay.asObservable();

        observable.subscribe(obs => {
            if (obs instanceof HttpResponse) {
                if (!!key) {
                    this.cacheService.put(key, obs);
                }
            }
        }, (err) => {
            this.toastr.error(err.error?.message || 'Error while fetching data', 'Alert !');
        })

        return observable;
    }

}