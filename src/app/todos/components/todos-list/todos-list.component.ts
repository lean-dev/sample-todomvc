import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { StoreService } from '../../services/store.service';
import { Todo } from '../../model/todo.type';

@Component({
  selector: 'todos-list',
  templateUrl: './todos-list.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodosListComponent {
  private storeSvc = inject(StoreService);

  todos$ = this.storeSvc.filteredTodos$;

  trackByFn(_ix: number, todo: Todo) {
    return todo.id;
  }
}
