import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ReportPageComponent } from './report-page.component';

import { ReportPageModule } from './report-page.module';

@NgModule({
  imports: [
    ReportPageModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: ReportPageComponent }
    ])
  ],
})
export class ReportPageRoutingModule {}
