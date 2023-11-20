import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const clonedRequest = req.clone({
            headers: req.headers.set('Accept', 'application/json')
                .set('Origin', 'localhost')
                // .set('Accept', '*/*').
                // set('Accept-Encoding', 'gzip, deflate, br')
                // .set('User-Agent', 'PostmanRuntime/7.35.0    ')
        });

        return next.handle(clonedRequest);
    }
}
