import {Injectable} from "@angular/core";
import {
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {TokenStorageService} from "../../token/token-storage.service";
import {catchError} from "rxjs/operators";
import {Router} from "@angular/router";

@Injectable()
export class Interceptor implements HttpInterceptor {

  constructor(private tokenStorageService: TokenStorageService, private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = this.tokenStorageService.getToken();
    let authReq = req;

    if (authToken) {
      authReq = req.clone({headers: req.headers.set("Authorization", "Bearer " + authToken)})
    }

    return next.handle(authReq).pipe(
      catchError((err) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            console.log("Error with token!");
            this.router.navigate(['post-list']);

            //albo jestesmy bez tokenu albo token jest przestarzaly
            //tutaj powinno byc zaimplementowane odswiezanie tokenu!
          }
        }
        return throwError(err);
      })
    )
  }
}

export const interceptorProviders = [
  {provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true}
];
