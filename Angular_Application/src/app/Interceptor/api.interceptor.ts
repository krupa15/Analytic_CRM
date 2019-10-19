import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { DataService } from '../services/storage.service';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
    public constructor(private _data: DataService) {

    }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token: string = sessionStorage.getItem('token');
        if (token) {
            request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
        }
        if (!request.headers.has('Content-Type')) {
            
            request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
        }
        request = request.clone({ headers: request.headers.set('Accept', 'application/json') });
        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    console.log('event--->>>', event);
                }
                return event;
            }), catchError((error: HttpErrorResponse) => {
                if (error.status == 401) {
                    sessionStorage.removeItem("token");
                    this._data.updateLogInSatus();
                }
                let data = {};
                data = {
                    reason: error && error.error.reason ? error.error.reason : '',
                    status: error.status
                };
                console.log("error handled")
                return throwError(error);
            })
        );
    }
}