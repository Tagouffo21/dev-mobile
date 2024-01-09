import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from 'src/app/services/api.service';
import { LanguageService } from 'src/app/services/language.service';
import { SocialshareService } from 'src/app/services/socialshare.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-landpage',
  templateUrl: './landpage.page.html',
  styleUrls: ['./landpage.page.scss'],
})
export class LandpagePage implements OnInit {

  categories: any[] = [];
  questions: any[] = [];
  answers: any[] = [];

  loaded = false;
  isFirst: boolean = false;

  base_url: string = 'https://mboaculture.ossu-technology.com';

  currentUserName: string = '';
  currentUSerScore: number = 0;
  content:any = {}
  users:any;
  constructor(
    private _api: ApiService,
    private route: Router,
    private _storage: StorageService,
    private actionSheet:ActionSheetController,
    private _languageService:LanguageService,
    private translate:TranslateService,
    private _shareservice:SocialshareService,
  ) {}

  ionViewWillEnter(){
    this.currentUserName = localStorage.getItem('currentPlayer');
    console.log(this.currentUserName);
    this.currentUSerScore = this._storage.score;
    this._storage.getData('usersToScore').then((res) => {
      this.currentUSerScore = res.get(this.currentUserName);
      this.users = res;
    });
  }

  ionViewDidEnter(){
    this.content = this._languageService.APP_CONTENT['Home'];
  
   }

  ngOnInit() {
    

    this._storage.getData('first').then((res) => {
      console.log(this.loaded);
      if (res == true) {
        this._api.getData(this.base_url+'/api/categories').subscribe(res=>{
          console.log("seeee")
          let data = JSON.parse(JSON.stringify(res.data))
          console.log(data)
    
          this.categories = data.data
          this.loaded = true
          this._storage.setData('categories', this.categories);
    
        })
        /*this._api.getData(this.base_url + `/api/categories`).subscribe((res) => {
          res.data.forEach((elt) => {
            elt.Libelle_categorie = elt.Libelle_categorie.toLowerCase();
          });
          this.categories = res.data;
          this.loaded = true;
          this._storage.setData('categories', this.categories);
        });*/

        this._api.getData(this.base_url + `/api/questions`).subscribe((res) => {
          this.questions = res.data;
          this._storage.setData('questions', this.questions);
        });

        this._api.getData(this.base_url + `/api/reponses`).subscribe((res) => {
          this.answers = res.data;
          this._storage.setData('answers', this.answers);
        });
      } else {
        this._storage.getData('categories').then((res) => {
          this.categories = res;
          this.loaded = true
        });
        this._storage.getData('questions').then((res) => {
          this.questions = res;
        });
        this._storage.getData('answers').then((res) => {
          this.answers = res;
        });
      }
    });
  }

  openPlayConfig(item: any) {
    localStorage.setItem('currentCategory', JSON.stringify(item));
    this.route.navigate(['play-config']);
  }



  async presentActionSheet(){
    const actionSheet = await this.actionSheet.create({
      header: 'Partagez le jeu avec vos amis',
      cssClass:'actionSheet',
      buttons:[
        {
          text:'Whatsapp',
          icon:"logo-whatsapp",
          handler: ()=>{
            this._shareservice.shareviaWhatsapp();
          }
          
        },
        {
          text:'Facebook',
          icon:'logo-facebook',
          handler: ()=>{
            this._shareservice.shareviaFacebook();
          }
        },
        {
          text:'Instagram',
          icon:'logo-instagram',
          handler: ()=>{
            this._shareservice.shareviaInstagram();
          }
        },
        {
          text:'Gmail',
          icon:'mail-outline',
          handler: ()=>{
            this._shareservice.SendEmail();
          }
        },
        
        {
          text:this.translate.instant('share.copy'),
          icon:'link-outline'
        }
        ,
      ]
      
    });
    await actionSheet.present();
  }
}
