import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { ApiService } from './services/api.service';
import { NetworkService } from './services/network.service';
import { IonicStorageModule } from '@ionic/storage-angular';
import { LanguageService } from './services/language.service';
import {HttpClientModule,HttpClient} from "@angular/common/http"
import {TranslateModule,TranslateLoader, TranslateService} from '@ngx-translate/core'
import {TranslateHttpLoader} from '@ngx-translate/http-loader'
import { PopoverPageModule } from './pages/popover/popover.module';
import {SocialSharing} from '@ionic-native/social-sharing';
import { PlayPage } from './pages/play/play.page';

export function createTranslateLoader(http:HttpClient){
  return new TranslateHttpLoader(http);
}



@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    PopoverPageModule,
   TranslateModule.forRoot({
      loader:{
        provide: TranslateLoader,
        useFactory:(createTranslateLoader),
        deps:[HttpClient]
      }
    })
  ],
  providers: [
    ApiService,
    NetworkService,
    LanguageService,
    Storage,
    SocialSharing,
    TranslateService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
