import { Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, map } from 'rxjs';
import { Todo } from '../model/todo.type';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private todosSource = new BehaviorSubject<Todo[]>([]);

  // Public Getters
  hasTodos$ = this.todosSource.pipe(
    map((todos) => todos.length > 0),
    distinctUntilChanged()
  );
}
