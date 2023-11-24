import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UseCaseSetMessages } from 'src/core/use-case/use-case-set-messages';
import { IMessages, eSeverity } from 'src/core/models/message-notify.models';

@Injectable({ providedIn: 'root' })
export class InterceptorError implements HttpInterceptor {

    constructor(private useCaseSetMessages: UseCaseSetMessages) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            // En InterceptorError
            catchError((error: HttpErrorResponse) => {
                if (error.status === 403) {
                    const message: IMessages = {
                        detail: error.error,
                        isShow: true,
                        severity: eSeverity.WANR // Asegúrate de que la severidad sea correcta
                    };
                    this.useCaseSetMessages.execute(message);
                }
                if (error.status === 429) {
                    const message: IMessages = {
                        detail: 'Account off',
                        isShow: true,
                        severity: eSeverity.DANGER // Asegúrate de que la severidad sea correcta
                    };
                    this.useCaseSetMessages.execute(message);
                }
                return throwError(() => error); // Importante para re-lanzar el error
            })

        );
    }
}
