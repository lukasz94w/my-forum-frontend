import {Injectable} from "@angular/core";
import {
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest, HttpStatusCode
} from "@angular/common/http";
import {BehaviorSubject, Observable, throwError} from "rxjs";
import {LocalStorageService} from "../../service/local-storage.service";
import {catchError, filter, switchMap, take} from "rxjs/operators";
import {AuthService} from "../../service/auth.service";
import {SignOutService} from "../../service/event/sign-out.service";

@Injectable()
export class Interceptor implements HttpInterceptor {

  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private localStorageService: LocalStorageService, private authService: AuthService,
              private signOutService: SignOutService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accessToken = this.localStorageService.getAccessToken();
    let authReq = req;

    if (accessToken) {
      authReq = Interceptor.addTokenHeader(req, accessToken);
    }

    return next.handle(authReq).pipe(catchError(error => {
      if (error instanceof HttpErrorResponse && error.status === HttpStatusCode.Unauthorized) {
        return this.handleUnauthorized401Error(authReq, next);
      }

      return throwError(error);
    }));
  }

  private handleUnauthorized401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      const refreshToken = this.localStorageService.getRefreshToken();

      if (refreshToken)
        return this.authService.refreshToken(refreshToken).pipe(
          switchMap((token: any) => {
            this.isRefreshing = false;
            this.localStorageService.saveAccessToken(token.accessToken);
            this.refreshTokenSubject.next(token.accessToken);

            return next.handle(Interceptor.addTokenHeader(request, token.accessToken));
          }),
          catchError((err) => {
              this.isRefreshing = false;
              // 1.it's should always be 403 but checking it anyway
              // 2.this if should never be entered but in case logout counter in app.component.ts
              // didn't work, broadcasting the event should cause global sign out
              if (err.error.statusCode === HttpStatusCode.Forbidden && this.localStorageService.isLoggedIn()) {
                this.localStorageService.signOut();
                this.signOutService.emitSignOut();
              }

              return throwError(err);
            }
          )
        );
    }

    return this.refreshTokenSubject.pipe(
      filter(token => token !== null),
      take(1),
      switchMap((token) => next.handle(Interceptor.addTokenHeader(request, token)))
    );
  }

  private static addTokenHeader(req: HttpRequest<any>, accessToken: string) {
    return req.clone(({headers: req.headers.set("Authorization", "Bearer " + accessToken)}));
  }
}

export const interceptorProviders = [
  {provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true}
];
