import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'todos-item',
  templateUrl: './todos-item.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodosItemComponent {

}
