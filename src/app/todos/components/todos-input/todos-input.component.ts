import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'todos-input',
  templateUrl: './todos-input.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodosInputComponent {
  @Output()
  create = new EventEmitter<string>();

  createTodo(title: string) {
    this.create.emit(title);
  }
}
