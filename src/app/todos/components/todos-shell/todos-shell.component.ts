import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'todos-shell',
  templateUrl: './todos-shell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodosShellComponent {}
