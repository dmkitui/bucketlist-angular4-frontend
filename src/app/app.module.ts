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
import { RegisterComponent } from './register/register.component';
import { BucketlistViewComponent } from './bucketlist-view/bucketlist-view.component';
import { ListViewComponent } from './list-view/list-view.component';
import { BucketlistsServiceService } from './bucketlists-service.service';
import {Routes, RouterModule} from '@angular/router';
import { FormsModule } from '@angular/forms' ;

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'bucketlistview', component: BucketlistViewComponent },
  { path: 'home', component: HomepageComponent },
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
    RegisterComponent,
    BucketlistViewComponent,
    ListViewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes, {useHash: true})
  ],
  providers: [
    SweetAlertService,
    BucketlistsServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
