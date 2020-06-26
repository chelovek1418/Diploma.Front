import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { AuthModule, LogLevel, OidcConfigService } from 'angular-auth-oidc-client';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS }    from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StudentModule } from './modules/student/student.module';
import { TeacherModule } from './modules/teacher/teacher.module';
import { AdminModule } from './modules/admin/admin.module';
import { CommonModule } from './modules/common/common.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { AuthInterceptor } from './interceptors/auth/auth-interceptor';
import { RenewInterceptor } from './interceptors/silentRenew/renew-interceptor';

export function configureAuth(oidcConfigService: OidcConfigService) {
  return () => oidcConfigService.withConfig({
          stsServer: 'https://localhost:44361',
          redirectUrl: window.location.origin,
          postLogoutRedirectUri: window.location.origin,
          clientId: 'angular_spa',
          scope: 'openid StudentPerfomanceApi',
          responseType: 'code',
          // logLevel: LogLevel.Debug,
      });
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    StudentModule,
    TeacherModule,
    CommonModule,
    AdminModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    AuthModule.forRoot(),
  ],
  providers: [
    OidcConfigService,
    {
        provide: APP_INITIALIZER,
        useFactory: configureAuth,
        deps: [OidcConfigService],
        multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RenewInterceptor,
      multi: true
    }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
