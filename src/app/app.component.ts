import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import {App} from '@capacitor/app';
import { StorageService } from './services/storage.service';
import { LanguageService } from './services/language.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private plateform:Platform,private _route:Router,
    private _storage:StorageService,
    private _languageService:LanguageService
    ) 
  {
    _languageService.setInitialLanguage();

    _storage.getData("SELECTED_LANGUAGE").then(res=>{
      _languageService.getContent(res)
    })
    this.plateform.backButton.subscribeWithPriority(-1,()=>{
      if(_route.url=="home")
      {
        App.exitApp()
      }
    })
  }
}
