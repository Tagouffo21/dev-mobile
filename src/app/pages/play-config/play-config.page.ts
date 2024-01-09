import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { LanguageService } from 'src/app/services/language.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-play-config',
  templateUrl: './play-config.page.html',
  styleUrls: ['./play-config.page.scss'],
})
export class PlayConfigPage implements OnInit {
  base_url:string = "https://mboaculture.ossu-technology.com";
  
  Levels: any[] = [];
  loaded = false;
  isFirst: boolean = false;
  category: any;
  QuestionsPlayed = new Set<number>();
  content:any = {}
  constructor(
    private _api: ApiService,
    private route: Router,
    private _storage: StorageService,
    private _languageService:LanguageService
  ) {}

  ionViewDidEnter(){
    this.content = this._languageService.APP_CONTENT['play_config'];
  
   }

  ngOnInit() {
    let user = localStorage.getItem('currentPlayer');
    this._storage.getData(user).then(res=>{
      console.log(res)
      if(res==null){
        this._storage.setData(user,this.QuestionsPlayed)
      }
    })
    this.category = JSON.parse(localStorage.getItem('currentCategory'));
    this._storage.getData('first').then((res) => {
      if (res == true) {
        this._api.getData(this.base_url +'/api/niveaux').subscribe((res) => {
          this._storage.setData('levels', res.data);
          this._storage.setData('first', false);
          this.Levels = res.data;
          this.loaded = true;
        });
      } else {
        this._storage.getData('levels').then((res) => {
          this.Levels = res;
        });

        this.loaded = true;
      }
    });
    
  }


  questionByLevel(item: any) {
    localStorage.setItem('currentLevel', JSON.stringify(item));
    this.route.navigate(['play']);
  }

}
