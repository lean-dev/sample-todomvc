import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'todos-list',
  templateUrl: './todos-list.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodosListComponent {

}
