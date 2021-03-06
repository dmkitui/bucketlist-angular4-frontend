import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SweetAlertService } from 'angular-sweetalert-service';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { FooterComponent } from './components/footer/footer.component';
import { TitleBarComponent } from './components/title-bar/title-bar.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { BucketlistViewComponent } from './components/bucketlist-view/bucketlist-view.component';
import { BucketlistsServiceService } from './bucketlists-service.service';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AlertComponent } from './services/alert-service/alert-service.component' ;
import { AlertService } from './services/alert-service.service';
import { SweetAlert2Module } from '@toverux/ngsweetalert2';
import { RegistrationComponent } from './components/registration/registration.component';
import { RegistrationService } from './services/api.service';
import { HttpModule } from '@angular/http';
import { AuthGuard as AuthGuard } from './auth/auth.guard';
import { LoginRedirectComponent } from './components/login-redirect/login-redirect.component';
import { LoadingModule, ANIMATION_TYPES  } from 'ngx-loading';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'bucketlistview', component: BucketlistViewComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomepageComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'login-redirect', component: LoginRedirectComponent },
  { path: '**', redirectTo: 'home'}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FooterComponent,
    TitleBarComponent,
    HomepageComponent,
    BucketlistViewComponent,
    AlertComponent,
    RegistrationComponent,
    LoginRedirectComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(routes, {useHash: true}),
    LoadingModule.forRoot({
        animationType: ANIMATION_TYPES.threeBounce,
        backdropBackgroundColour: '#ffffff',
        backdropBorderRadius: '4px',
        primaryColour: '#78EC5E',
        secondaryColour: '#3A9E23',
        tertiaryColour: '#166205'
    }),
    [SweetAlert2Module.forRoot()],
  ],
  providers: [
    AuthGuard,
    SweetAlertService,
    BucketlistsServiceService,
    AlertService,
    RegistrationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
