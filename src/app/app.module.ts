import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SweetAlertService } from 'angular-sweetalert-service';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MainscreenComponent } from './mainscreen/mainscreen.component';
import { FooterComponent } from './footer/footer.component';
import { TitleBarComponent } from './title-bar/title-bar.component';
import { HomepageComponent } from './homepage/homepage.component';
import { BucketlistViewComponent } from './bucketlist-view/bucketlist-view.component';
import { ListViewComponent } from './list-view/list-view.component';
import { BucketlistsServiceService } from './bucketlists-service.service';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AlertComponent } from './alert-service/alert-service.component' ;
import { AlertService } from './alert-service.service';
import { SweetAlert2Module } from '@toverux/ngsweetalert2';
import { RegistrationComponent } from './registration/registration.component';
import { RegistrationService } from './api.service';
import { HttpModule } from '@angular/http';
import { AuthGuard as AuthGuard } from './auth/auth.guard';
import { LoginRedirectComponent } from './components/login-redirect/login-redirect.component';


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
    SidebarComponent,
    MainscreenComponent,
    FooterComponent,
    TitleBarComponent,
    HomepageComponent,
    BucketlistViewComponent,
    ListViewComponent,
    AlertComponent,
    RegistrationComponent,
    LoginRedirectComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(routes, {useHash: true}),
    [SweetAlert2Module]
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
