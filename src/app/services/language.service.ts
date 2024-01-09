import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Device } from '@capacitor/device';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';
const KEY_LNG = "SELECTED_LANGUAGE"

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  
  selected="";
  obj:any = {}
  lng:string = ""
  APP_CONTENT:[] = [];
  constructor(
    private storage:Storage,
    private translate:TranslateService,
    private http:HttpClient
  ) { }


  async getLanguage(){
    return await Device.getLanguageCode();
  }


  setInitialLanguage(){
    this.storage.get(KEY_LNG).then(lng=>{
      if(lng==null){
        this.getLanguage().then(res=>{
          this.selected = res.value;
          this.translate.setDefaultLang(this.selected);
          this.storage.set(KEY_LNG,this.selected)
        })
      }
      else{
        this.translate.use(lng);
        this.selected = lng;
       
      }
    })

  }

  getLanguages(){
    return [
      {text:"English",value:"en",img:"assets/images/en.png"},
      {text:"French",value:"fr",img:"assets/images/fr.jpeg"},

    ]
  }

  getContent(lng:string){
    this.http.get(`assets/i18n/${lng}.json`).subscribe(data=>{
      this.APP_CONTENT = JSON.parse(JSON.stringify(data));
      console.log(this.APP_CONTENT)
    })
  }

  setLanguage(lng){
    this.translate.use(lng);
    this.selected = lng;
    this.storage.set(KEY_LNG,lng);
    this.obj = this.getLanguages().find(x=>x.value==this.selected);
    this.lng = this.obj.text
  }

}
