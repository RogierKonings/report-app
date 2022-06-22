import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FileUploadComponent } from './file-upload.component';

import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [CommonModule, MatButtonModule],
  declarations: [FileUploadComponent],
  providers: [],
  exports: [FileUploadComponent],
})
export class FileUploadModule {}
