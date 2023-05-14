import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, combineLatestWith, distinctUntilChanged, map } from 'rxjs';
import { Todo } from '../model/todo.type';
import { LocationService } from './location.service';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  locationSvc = inject(LocationService);

  private todosSource = new BehaviorSubject<Todo[]>([]);

  nextId = 1;

  // Public Getters
  filteredTodos$ = this.todosSource.pipe(
    combineLatestWith(this.locationSvc.route$),
    map(([todos, route]) => (route === 'all' ? todos : todos.filter((t) => t.completed === (route === 'completed'))))
  );

  hasTodos$ = this.todosSource.pipe(
    map((todos) => todos.length > 0),
    distinctUntilChanged()
  );

  // Missing distinctUntilChanged from here on!!
  allTodosCompleted$ = this.todosSource.pipe(map((todos) => !todos.some((t) => !t.completed)));

  activeCount$ = this.todosSource.pipe(
    map((todos) => todos.reduce((count, t) => (t.completed ? count : count + 1), 0))
  );

  hasCompleted$ = this.todosSource.pipe(map((todos) => todos.some((t) => t.completed)));

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
  setTodoTitle(id: Todo['id'], title: string) {
    this.nextTodos((todos) => todos.map((t) => (t.id !== id ? t : { ...t, title })));
  }
  deleteTodo(id: Todo['id']) {
    this.nextTodos((todos) => todos.filter((t) => t.id !== id));
  }
  setAllTodosCompleted(completed: boolean) {
    this.nextTodos((todos) => todos.map((t) => (t.completed === completed ? t : { ...t, completed })));
  }
  clearCompletedTodos() {
    this.nextTodos((todos) => todos.filter((t) => !t.completed));
  }
}
