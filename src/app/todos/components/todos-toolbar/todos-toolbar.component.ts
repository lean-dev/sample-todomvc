import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'todos-toolbar',
  templateUrl: './todos-toolbar.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodosToolbarComponent {
  private storeSvc = inject(StoreService);

  hasTodo$ = this.storeSvc.hasTodos$;
}
