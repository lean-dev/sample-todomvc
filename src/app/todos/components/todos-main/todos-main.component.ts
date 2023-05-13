import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'todos-main',
  templateUrl: './todos-main.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodosMainComponent {
  private storeSvc = inject(StoreService);

  hasTodo$ = this.storeSvc.hasTodos$;
}
