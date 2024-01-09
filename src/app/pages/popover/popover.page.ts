import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.page.html',
  styleUrls: ['./popover.page.scss'],
})
export class PopoverPage implements OnInit {


  languages = [];
  selected = '';
  constructor(private popCtrl:PopoverController,private language:LanguageService) { }

  ngOnInit() {
    this.languages = this.language.getLanguages();
    this.selected = this.language.selected;
  }

  select(lng){
    this.language.setLanguage(lng);
    this.popCtrl.dismiss();
  }
}
