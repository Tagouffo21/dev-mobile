import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlayConfigPageRoutingModule } from './play-config-routing.module';

import { PlayConfigPage } from './play-config.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlayConfigPageRoutingModule,
    TranslateModule
  ],
  declarations: [PlayConfigPage]
})
export class PlayConfigPageModule {}
