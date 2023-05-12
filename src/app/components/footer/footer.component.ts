import {CommonModule} from '@angular/common'
import {ChangeDetectionStrategy, Component} from '@angular/core'

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-footer',
  template: `<div class="container">Created by: Rogier Konings</div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {}
