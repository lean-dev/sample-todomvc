import { InjectionToken } from '@angular/core';
import { Todo } from '../model/todo.type';

export interface Persistence {
  getAll(): Promise<Todo[]>;
  create(title: string): Promise<Todo>;
  update(id: Todo['id'], changes: Partial<Omit<Todo, 'id'>>): Promise<Todo>;
  remove(id: Todo['id']): Promise<void>;
}

export const PERSISTENCE = new InjectionToken<Persistence>('Persistence implemetation');
