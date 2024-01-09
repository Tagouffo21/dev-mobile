import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { ActionSheetController, AlertController, NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/services/language.service';
import { StorageService } from 'src/app/services/storage.service';
import { SocialSharing } from '@ionic-native/social-sharing'
import { timer } from 'rxjs';
import { SocialshareService } from 'src/app/services/socialshare.service';



@Component({
  selector: 'app-play',
  templateUrl: './play.page.html',
  styleUrls: ['./play.page.scss'],
})
export class PlayPage implements OnInit {
 base_url:string = "https://mboaculture.ossu-technology.com";

  game:any;
  active:string;
  niv: any;
  catego:any
  questionNumber:number=1;
  end:boolean=false;
  private start = 0
  loaded = false;
  private time:number = 120;
  sec:any = "00";
  min:any = "02";
  init:string =""
  msg:string ="";
  playedIndexes  = new Set<number>()

  questions:any[] = [];
  responses:any[] = [];
  questionlen:number=0;
  currentUserName = '';
  currentUSerScore = 0;
  currentQuestionId = -1;
  QuestionsPlayed = new Set<number>();
  Timer;
  content:any = {}



  constructor(private api:ApiService,
    private _storage:StorageService,
    private alertController:AlertController,
    private alrt:AlertController,
    private route:Router,
    public navCtrl:NavController,
    private _languageService:LanguageService,
    private _shareservice:SocialshareService,
    private translate:TranslateService,
    private actionSheet:ActionSheetController
    ) {
    
    
  }


  ionViewWillEnter(){
    this.end = false;
    
  }




  ionViewDidEnter(){
    this.time = 120
    this.start=0;

    
    let box = document.getElementById("timer")
    box.style.background = "var(--ion-color-primary-contrast)";
    console.log("route",this.route.url)

    this.Timer =  setInterval(() => {
      console.log("start",this.start)
      if(this.time<=0){
        this.Next();
        this.time = 120
        this.start=0;
      }
      this.time --
      this.start+=0.83;
      let box = document.getElementById("timer")

      box.style.background = `conic-gradient(var(--ion-color-primary) ${Math.floor(this.start * 3.6)}deg, var(--ion-color-primary-contrast) 0deg)`;
      this.min = this.time/60<10?'0'+Math.floor(this.time/60):Math.floor(this.time/60)
      this.sec = this.time%60<10?'0'+Math.floor(this.time%60):Math.floor(this.time%60);
      
    }, 1000);
  }

    ionViewDidLeave(){
    this.questions = []
    this.responses = [];
    console.log("View left")
    clearInterval(this.Timer);
  }


  async ngOnInit() {

      this.currentUserName = localStorage.getItem("currentPlayer");
      this._storage.getData(this.currentUserName).then(res=>{
        this.QuestionsPlayed = res;
        console.log(this.QuestionsPlayed)
      })
      this._storage.getData("usersToScore").then(res=>{
        this.currentUSerScore = res.get(this.currentUserName);
      })

      this.niv = JSON.parse(localStorage.getItem("currentLevel"));
      this.catego = JSON.parse(localStorage.getItem("currentCategory"))

      
      
    

      await this._storage.getData("questions").then(res=>{
        this.questions = res.filter(elt=>(elt.categories_id==this.catego.id && elt.niveaux_id==this.niv.id))
        this.questionlen = this.questions.length;
      })
      
      await this._storage.getData("answers").then(res=>{
        this.responses = res
      })



      if(this.questionlen!=0){
        let random = Math.floor(Math.random()*this.questions.length)
          
        this.init = this.questions[random].Libelle_question;
        this.currentQuestionId = this.questions[random].id
            
        this.playedIndexes.add(this.questions[random].id)
        this.questions.splice(random,1)


        this.responses = this.responses.filter(elt=>elt.questions_id==this.currentQuestionId);
        this.loaded = true;
      }
      else{
        this.msg = "Niveau non disponible";
      }



    
      console.log("questionId",this.currentQuestionId);
      
    }
  

    Next(){
      this.start = 0;
      this.time = 120;
      if(this.questionlen==this.playedIndexes.size){
        clearInterval(this.Timer)
        setTimeout(() => {
          this.end=true;

        }, 500);
      }
      else{
         setTimeout(async () => {
          let s = this.questions.length
          let random = Math.floor(Math.random()*s);
          this.loaded = false
  
          while(this.playedIndexes.has(this.questions[random].id) && this.playedIndexes.size!=this.questions.length){
            let random = Math.floor(Math.random()*this.questions.length);
          }
  
          this.currentQuestionId = this.questions[random].id
          
          this.questionNumber++
          this.init = this.questions[random].Libelle_question;
          
  
          this.playedIndexes.add(this.questions.indexOf(this.init))
          this.questions.splice(random,1)
          await this._storage.getData("answers").then(res=>{
            this.responses = res
          })
          this.responses = this.responses.filter(elt=>elt.questions_id==this.currentQuestionId)
          this.loaded = true;
          console.log("question id",this.currentQuestionId)
          console.log(this.responses)
  
        }, 500);
      }
    }














    validateAnswer(item:any){
      this.active = item.est_correct=="Vrai"?"true":"false";

      item.style = this.active;

      if(item.est_correct=="Vrai"){
        if(this.QuestionsPlayed.has(this.currentQuestionId)==false){
          this.currentUSerScore +=item.points;
          this._storage.score = this.currentUSerScore;
          this._storage.getData("usersToScore").then(res=>{
            res.set(this.currentUserName,this.currentUSerScore);
          this._storage.setData('usersToScore',res);
          this.QuestionsPlayed.add(this.currentQuestionId);
          this._storage.setData(this.currentUserName,this.QuestionsPlayed);
        })
        }
      }

      this.Next();
    }

    
    async openDialog(){ 
        const alert = await this.alertController.create(
        { header: 'Confirmation'
        , 
       
        message: this.translate.instant('confirm.message'), 
        buttons: [ 
          { 
          text: this.translate.instant('confirm.no'),
          role: 'cancel', 
          cssClass: 'secondary'
          , 
          handler: (blah) => { console.log('Confirm Cancel: blah'); } 
          }, { 
          text: this.translate.instant('confirm.yes'),
          role: 'Back',
          handler: () => {clearInterval(this.Timer);this.navCtrl.pop()} 
          } ]
        }); 
        await alert.present(); 
        const { role } = await alert.onDidDismiss(); 
        console.log('onDidDismiss resolved with role'
        , role); 
        
    }


   async socialSharing(){
        const sheet = await this.actionSheet.create({
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
        await sheet.present();
        console.log("sharing")
      }

      test(ev){
        alert("test");
      }


}
