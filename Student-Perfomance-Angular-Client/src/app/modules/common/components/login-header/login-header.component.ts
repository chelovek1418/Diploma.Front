import { Component, OnInit, OnDestroy } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { Subscription, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login-header',
  templateUrl: './login-header.component.html',
  styleUrls: ['./login-header.component.css']
})
export class LoginHeaderComponent implements OnInit, OnDestroy {

  private authSub: Subscription;
  private checkAuthSub: Subscription;

  constructor(public oidcSecurityService: OidcSecurityService, private http: HttpClient) {
  }

  ngOnInit(): void {
    this.checkAuthSub = this.oidcSecurityService.checkAuth().subscribe();
    console.log(this.oidcSecurityService.configuration);
    console.log(this.oidcSecurityService);
  }

  ngOnDestroy(): void {
    this.authSub?.unsubscribe();
    this.checkAuthSub?.unsubscribe();
  }

  logIn(): void {
    console.log(this.oidcSecurityService.configuration)
    this.oidcSecurityService.authorize();
  }

  logOut(): void {
    this.oidcSecurityService.logoff();
  }

  secret(): void {
    this.http.get("https://localhost:44322/Secret").subscribe();
  }

}
