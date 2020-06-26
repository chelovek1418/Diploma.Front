import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class Guard implements CanActivate {
 
    constructor(private oidcSecurityService: OidcSecurityService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.oidcSecurityService.isAuthenticated$.pipe(
            map((isAuthorized: boolean) => {
                if (!isAuthorized) {
                    this.router.navigate(['/login']);
                    return false;
                }

                return true;
            })
        );
    }
}
