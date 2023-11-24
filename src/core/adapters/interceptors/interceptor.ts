import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const clonedRequest = req.clone({
            headers: req.headers.set('Accept', 'application/json')
        });

        return next.handle(clonedRequest);
    }
}
