import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileUploadComponent {

  @Input() name!: string;
  @Input() acceptedTypes!: string;

  @Output() inputChange = new EventEmitter<File>();

  public inputChanged($event: any): void {
    const file: File = $event.target.files[0];
    this.inputChange.emit(file);
  }
}
