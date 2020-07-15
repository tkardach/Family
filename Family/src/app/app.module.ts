import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { OffspringAlbumModule } from './offspring-album/offspring-album.module';
import { HomeComponent } from './home/home.component';
import { SharedModule } from './shared/shared.module';
import { LoggerModule } from 'ngx-logger';
import { environment } from 'src/environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { UploadModule } from './upload/upload.module';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    OffspringAlbumModule,
    UploadModule,
    SharedModule,
    HttpClientModule,
    LoggerModule.forRoot({
      serverLoggingUrl: environment.apiUrl,
      level:environment.logLevel,
      serverLogLevel: environment.serverLogLevel,
      disableConsoleLogging: false
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
