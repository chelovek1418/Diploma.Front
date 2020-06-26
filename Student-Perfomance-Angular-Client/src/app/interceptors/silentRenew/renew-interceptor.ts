
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { tap, finalize } from 'rxjs/operators';

@Injectable()
export class RenewInterceptor implements HttpInterceptor {

    private refreshing: boolean = false;
    //     var refreshing = false;

    // axios.interceptors.response.use(
    //     function (response) { return response; },
    //     function (error) {
    //         console.log(error.response);

    //         var axiosConfig = error.response.config;

    //         if (error.response.status === 401) {
    //             if (!refreshing) {
    //                 refreshing = true;

    //                 return userManager.signinSilent().then(user => {
    //                     axios.defaults.headers.common["Authorization"] = "Bearer " + user.access_token;
    //                     axiosConfig.headers["Authorization"] = "Bearer " + user.access_token;
    //                     return axios(axiosConfig);
    //                 });
    //             }
    //         }

    //         return Promise.reject(error);
    //     });

    constructor(private oidcSecurityService: OidcSecurityService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // extend server response observable with logging
        return next.handle(req)
            // .pipe(
            //     tap(
            //         event => {
            //             if (event instanceof HttpResponse && event.status === 401) {
            //                 console.log(event);
            //                 if (!this.refreshing)
            //                     this.refreshing = true;
            //                     return this.oidcSecurityService. signinSilent().then(user => {
            //                         //                     axios.defaults.headers.common["Authorization"] = "Bearer " + user.access_token;
            //                         //                     axiosConfig.headers["Authorization"] = "Bearer " + user.access_token;
            //                         //                     return axios(axiosConfig);
            //                         //                 });
            //             }
            //         }

            //     )
            // );
    }
}