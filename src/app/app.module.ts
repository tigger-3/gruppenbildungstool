import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { APP_INITIALIZER } from '@angular/core';
import { ConfigService } from './config/config.service';
import { map } from 'rxjs/operators';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
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
             resolve(true);
           })
         ).subscribe();
    });
  };
}
