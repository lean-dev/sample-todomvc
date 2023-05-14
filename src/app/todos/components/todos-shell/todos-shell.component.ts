import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'todos-shell',
  templateUrl: './todos-shell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodosShellComponent {
  private storeSvc = inject(StoreService);

  handleCreate(title: string) {
    this.storeSvc.createTodo(title);
  }
}
