import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageWrapperComponent } from './page-wrapper.component';

import { HeaderModule } from 'src/app/components/header/header.module';
import { FooterModule } from 'src/app/components/footer/footer.module';

@NgModule({
  imports: [
    CommonModule,
    HeaderModule,
    FooterModule
  ],
  declarations: [PageWrapperComponent],
  providers: [],
  exports: [PageWrapperComponent]
})
export class PageWrapperModule {}
