import { Injectable } from '@angular/core';
import { Persistence } from './persistence.interface';
import { Todo } from '../model/todo.type';

function loadTodos(): Todo[] {
  return JSON.parse(localStorage.getItem('todos-angular') || '[]');
}

function saveTodos(todos: Todo[]) {
  localStorage.setItem('todos-angular', JSON.stringify(todos));
}

function generateId() {
  const nextId = 1 + JSON.parse(localStorage.getItem('todos-angular.lastId') || '0');
  localStorage.setItem('todos-angular.lastId', nextId);
  return nextId;
}

@Injectable({
  providedIn: 'root',
})
export class LocalPersistenceService implements Persistence {
  async getAll(): Promise<Todo[]> {
    return loadTodos();
  }

  async create(title: string): Promise<Todo> {
    const todos = loadTodos();
    const todo = { id: generateId(), title, completed: false };
    saveTodos([...todos, todo]);
    return todo;
  }

  async update(id: string | number, changes: Partial<Omit<Todo, 'id'>>): Promise<Todo> {
    const todos = loadTodos();
    const todo = todos.find((t) => t.id === id);
    if (!todo) throw new Error('Not found');
    const updatedTodo = { ...todo, ...changes };
    saveTodos(todos.map((t) => (t.id === id ? updatedTodo : t)));
    return updatedTodo;
  }

  async remove(id: string | number): Promise<void> {
    const todos = loadTodos();
    const todo = todos.find((t) => t.id === id);
    if (!todo) throw new Error('Not found');
    saveTodos(todos.filter((t) => t.id !== id));
  }
}
