import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { APP_INITIALIZER } from '@angular/core';
import { ConfigService } from './config/config.service';
import { map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { LoginScreenComponent } from './login-screen/login-screen.component';
import { ListScreenComponent } from './list-screen/list-screen.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginScreenComponent,
    ListScreenComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    CommonModule,
    MaterialModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initialize,
      deps: [
        HttpClient,
        ConfigService
      ],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


function initialize(http: HttpClient, config: ConfigService) {
	return (): Promise<boolean> => {
    return new Promise<boolean>((resolve: (a: boolean) => void): void => {
      http.get('./config.json').pipe(
           map((x: ConfigService) => {
             config.moodle_address = x.moodle_address;
             config.webservice_token = x.webservice_token;
             config.service_shortname = x.service_shortname;
             resolve(true);
           })
         ).subscribe();
    });
  };
}
