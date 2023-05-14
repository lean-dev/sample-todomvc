import { Observable } from 'rxjs';
import { Todo } from '../model/todo.type';

export interface Persistence {
  getAll(): Promise<Todo[]>;
  create(title: string): Promise<Todo>;
  update(id: Todo['id'], changes: Partial<Omit<Todo, 'id'>>): Promise<Todo>;
  remove(id: Todo['id']): Promise<void>;
}
