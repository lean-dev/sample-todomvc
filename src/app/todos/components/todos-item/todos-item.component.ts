import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { Todo } from '../../model/todo.type';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'todos-item',
  templateUrl: './todos-item.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodosItemComponent {
  storeSvc = inject(StoreService);

  @Input({ required: true })
  todo!: Todo;

  handleToggle() {
    this.storeSvc.setTodoCompleted(this.todo.id, !this.todo.completed);
  }

  handleTitleUpdate(title: string) {
    this.storeSvc.setTodoTitle(this.todo.id, title);
  }

  handleDestroy() {
    this.storeSvc.deleteTodo(this.todo.id);
  }

  editMode = false;
  beginEdit() {
    this.editMode = true;
  }
  commitEdit(title: string) {
    this.handleTitleUpdate(title);
    this.editMode = false;
  }
}
