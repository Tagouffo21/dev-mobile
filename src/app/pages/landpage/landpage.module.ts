import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LandpagePageRoutingModule } from './landpage-routing.module';

import { LandpagePage } from './landpage.page';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LandpagePageRoutingModule,
    TranslateModule
  ],
  declarations: [LandpagePage]
})
export class LandpagePageModule {}
