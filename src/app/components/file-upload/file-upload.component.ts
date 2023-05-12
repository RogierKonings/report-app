import {CommonModule} from '@angular/common'
import {Component, Input, Output, EventEmitter, ChangeDetectionStrategy} from '@angular/core'
import {MatButtonModule} from '@angular/material/button'

@Component({
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileUploadComponent {
  @Input() name!: string
  @Input() acceptedTypes!: string

  @Output() inputChange = new EventEmitter<File>()

  public inputChanged($event: any): void {
    const file: File = $event.target.files[0]
    this.inputChange.emit(file)
  }
}
