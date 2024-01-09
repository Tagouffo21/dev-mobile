import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController, PopoverController } from '@ionic/angular';
import { Toast } from '@capacitor/toast';
import { TranslateService } from '@ngx-translate/core';
import { PopoverPage } from '../pages/popover/popover.page';
import { LanguageService } from '../services/language.service';
import { NetworkService } from '../services/network.service';
import { StorageService } from '../services/storage.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  users = new Set<string>();
  size = this.users.size;
  first:boolean= false;
  lng:string="";

  usersToScore = new Map<string,number>();
  isFirst:boolean = false;
  // add : set.add(v)
  // contain : set.has(v)
  errormsg:string=""

  currentUser=""

  content:any = {}

  constructor(private route:Router,
    private modal:ModalController,
    private _network:NetworkService,
    private _storage:StorageService,
    private _languageService:LanguageService,
    private translate:TranslateService,
    private popCtrl:PopoverController
   ) {

   }

   async ionViewWillEnter(){
    await this._storage.getData("first").then(res=>{
      
      this.first = res
      console.log("first",this.first)
      if(res==false){
        this._storage.getData("users").then(res=>{
          this.users = res
        });

        
        this._storage.getData('usersToScore').then(res=>{
            this.usersToScore = res;
        });
      }

      else{
        this._network.getChange().then(res=>{
          if(res.connected==false){
            this.route.navigate(['no-network'])
          }
        })

        this._storage.setData("users",this.users);
        this._storage.setData('usersToScore',this.usersToScore);
      }
    })
   }

   ionViewDidEnter(){
    this.content = this._languageService.APP_CONTENT['Home'];
  
   }

    async ngOnInit() {
   
   }


  openModal(data:any){
    this.route.navigate(['landpage'])
  }

  getData(data:any){
    console.log(data)
    if(this.first==true){
       if(data.entered_name!=""){
        this.currentUser = data.entered_name.toLocaleLowerCase();
      
        this.users.add(this.currentUser)
        this.usersToScore.set(this.currentUser,0);
        localStorage.setItem("currentPlayer",this.currentUser);
        this._storage.setData('users',this.users);
        this._storage.setData('usersToScore',this.usersToScore)
        this.route.navigate(['landpage'])
       }
       else{
        this.errormsg = 'Veuillez entrer un profil'
       }

    }
    else{
      if(data.entered_name!=""){
        if(data.selected_name!=""){
          this.errormsg = "Un problème est survenu"
        }
        else{
          this.currentUser = data.entered_name.toLocaleLowerCase();
          if(this.users.has(this.currentUser)){
            this.errormsg = "Ce profil existe déjà";
          }else{
            this.users.add(this.currentUser)
            this.usersToScore.set(this.currentUser,0);
            this._storage.setData('users',this.users);
            this._storage.setData('usersToScore',this.usersToScore)
            localStorage.setItem("currentPlayer",this.currentUser)
            this.route.navigate(['landpage'])
            
          }
        }
      }
      else{
        if(data.selected_name!=""){
          this.currentUser = data.selected_name;
            localStorage.setItem("currentPlayer",this.currentUser.toLocaleLowerCase())
this.route.navigate(['landpage'])
        }
        else{
          this.errormsg = "Veuillez entrer un profil"
        }
      }
    }

  }


  ShowToast(n:string){
    Toast.show({
      text:n,
      position:"center",
      duration:"short"
      
    })
  }

  async openLanguagePopOver(ev){
    const pop = await this.popCtrl.create({
      component: PopoverPage,
      event:ev
    });
    await pop.present();
  }
}
