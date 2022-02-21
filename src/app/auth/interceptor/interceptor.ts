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
import {catchError, filter, finalize, switchMap, take} from "rxjs/operators";
import {AuthService} from "../../service/auth.service";
import {SignOutEvent} from "../../event/sign-out-event.service";
import {TextProviderService} from "../../service/text-provider.service";
import {LoadingStatusEvent} from "../../event/loading-status-event.service";

@Injectable()
export class Interceptor implements HttpInterceptor {

  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private activeRequests: number = 0;

  constructor(private localStorageService: LocalStorageService, private authService: AuthService,
              private signOutService: SignOutEvent, private textProviderService: TextProviderService,
              private loadingStatusEvent: LoadingStatusEvent) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(this.activeRequests === 0) {
      this.loadingStatusEvent.emitIsLoadingActive(true)
    }
    const accessToken = this.localStorageService.getAccessToken();
    let authReq = req;

    if (accessToken) {
      authReq = Interceptor.addTokenHeader(req, accessToken);
    }

    this.activeRequests++;
    return next.handle(authReq).pipe(
      finalize(() => {
        this.activeRequests--;
        if(this.activeRequests === 0) {
          this.loadingStatusEvent.emitIsLoadingActive(false);
        }
    }),
      catchError(error => {
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
          catchError((error) => {
              this.isRefreshing = false;
              if (this.localStorageService.isLoggedIn()) {
                if (error.status === HttpStatusCode.Forbidden) {
                  // server return 403 where unauthorized user access protected resource
                  // this could happen if logout counter in app.component.ts didn't work
                  this.localStorageService.signOut();
                  this.signOutService.emitSignOut();
                  alert(this.textProviderService.getSessionEndedMessage());
                } else if (error.status === HttpStatusCode.MethodNotAllowed) {
                  // if server return 405 status it means user has been banned
                  this.localStorageService.signOut();
                  this.signOutService.emitSignOut();
                  alert(this.textProviderService.getBanMessage());
                }
              }

              return throwError(error);
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
