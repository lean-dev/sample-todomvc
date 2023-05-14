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

  // Updater helper
  private nextTodos(update: (todos: Todo[]) => Todo[]) {
    this.todosSource.next(update(this.todosSource.value));
  }

  // Actions
  createTodo(title: string) {
    const todo = { id: this.nextId++, title, completed: false };
    this.nextTodos((todos) => [...todos, todo]);
  }
  setTodoCompleted(id: Todo['id'], completed: boolean) {
    this.nextTodos((todos) => todos.map((t) => (t.id !== id ? t : { ...t, completed })));
  }
  deleteTodo(id: Todo['id']) {
    this.nextTodos((todos) => todos.filter((t) => t.id !== id));
  }
}
