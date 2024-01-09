import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlayConfigPage } from './play-config.page';

const routes: Routes = [
  {
    path: '',
    component: PlayConfigPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlayConfigPageRoutingModule {}
