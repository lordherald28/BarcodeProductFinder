import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class InterceptorError implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // Comprueba si la URL de la solicitud contiene la base de la URL de la API de Flickr
        // Por el momento se esta utilizando solamente un recurso: FlickrAPI-Service
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                //imprimir un log, mostrar una notificación, etc.
                // console.log('Error API BarCode', error.error === null ? error.statusText : error.error);
                if (error.status === 403) {
                    return throwError(() => new Error(error.error === null ? error.statusText : error.error)); // Reenvía el error para manejarlos luego.                    
                }
                return throwError(() => new Error(error.error))
            })
        );

    }
}
