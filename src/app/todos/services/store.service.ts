import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, combineLatestWith, distinctUntilChanged, map } from 'rxjs';
import { Todo } from '../model/todo.type';
import { LocationService } from './location.service';
import { LocalPersistenceService } from './local-persistence.service';
import { PERSISTENCE } from './persistence.interface';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  locationSvc = inject(LocationService);
  persistenceSvc = inject(PERSISTENCE);

  private todosSource = new BehaviorSubject<Todo[]>([]);

  constructor() {
    this.persistenceSvc.getAll().then((todos) => this.todosSource.next(todos));
  }

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
  async createTodo(title: string) {
    const todo = await this.persistenceSvc.create(title);
    this.nextTodos((todos) => [...todos, todo]);
  }
  async setTodoCompleted(id: Todo['id'], completed: boolean) {
    const updatedTodo = await this.persistenceSvc.update(id, { completed });
    this.nextTodos((todos) => todos.map((t) => (t.id !== id ? t : updatedTodo)));
  }
  async setTodoTitle(id: Todo['id'], title: string) {
    const updatedTodo = await this.persistenceSvc.update(id, { title });
    this.nextTodos((todos) => todos.map((t) => (t.id !== id ? t : updatedTodo)));
  }
  async deleteTodo(id: Todo['id']) {
    await this.persistenceSvc.remove(id);
    this.nextTodos((todos) => todos.filter((t) => t.id !== id));
  }
  async setAllTodosCompleted(completed: boolean) {
    await Promise.all(
      this.todosSource.value.filter((t) => t.completed !== completed).map((t) => this.setTodoCompleted(t.id, completed))
    );
  }
  async clearCompletedTodos() {
    await Promise.all(this.todosSource.value.filter((t) => t.completed).map((t) => this.deleteTodo(t.id)));
  }
}
