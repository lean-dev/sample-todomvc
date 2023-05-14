import { Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, map } from 'rxjs';
import { Todo } from '../model/todo.type';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private todosSource = new BehaviorSubject<Todo[]>([]);

  nextId = 1;

  // Public Getters
  filteredTodos$ = this.todosSource.pipe();

  hasTodos$ = this.todosSource.pipe(
    map((todos) => todos.length > 0),
    distinctUntilChanged()
  );

  // Actions
  create(title: string) {
    const todo = { id: this.nextId++, title, completed: false };
    this.todosSource.next([...this.todosSource.value, todo]);
  }
  setTodoCompleted(id: Todo['id'], completed: boolean) {
    this.todosSource.next(this.todosSource.value.map((t) => (t.id !== id ? t : { ...t, completed })));
  }
  remove(id: Todo['id']) {
    this.todosSource.next(this.todosSource.value.filter((t) => t.id !== id));
  }
}
