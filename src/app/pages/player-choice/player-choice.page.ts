import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-player-choice',
  templateUrl: './player-choice.page.html',
  styleUrls: ['./player-choice.page.scss'],
})
export class PlayerChoicePage implements OnInit {

  constructor(private modal:ModalController) { }

  ngOnInit() {
  }

  async dismiss(){
    return await this.modal.dismiss();
  }
}
