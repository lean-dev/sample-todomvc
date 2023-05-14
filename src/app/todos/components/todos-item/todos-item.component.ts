import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Todo } from '../../model/todo.type';

@Component({
  selector: 'todos-item',
  templateUrl: './todos-item.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodosItemComponent {
  @Input({ required: true })
  todo!: Todo;
}
