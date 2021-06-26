import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderModule } from './components/header/header.module';
import { DashboardModule } from './pages/dashboard/dashboard.module';
import {
  DEFAULT_TIMEOUT,
  HttpInterceptorService,
} from 'src/app/services/http-interceptor/http-interceptor.service';
import { ManageUserService } from 'src/app/services/manage-user/manage-user.service';
import {
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';

@NgModule({
  declarations: [AppComponent, FooterComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    DashboardModule,
    HeaderModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true,
    },
    { provide: DEFAULT_TIMEOUT, useValue: 60000 },
    ManageUserService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
