import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Persistence } from './persistence.interface';
import { Todo } from '../model/todo.type';

const baseUrl = 'https://nube-server.vercel.app/api/public/todos';

@Injectable({
  providedIn: 'root',
})
export class HttpPersistenceService implements Persistence {
  constructor(private http: HttpClient) {}

  getAll(): Promise<Todo[]> {
    return firstValueFrom(this.http.get<Todo[]>(baseUrl));
  }
  create(title: string): Promise<Todo> {
    return firstValueFrom(this.http.post<Todo>(baseUrl, { title, completed: false }));
  }

  update(id: string | number, changes: Partial<Omit<Todo, 'id'>>): Promise<Todo> {
    return firstValueFrom(this.http.patch<Todo>(`${baseUrl}/${id}`, changes));
  }
  remove(id: string | number): Promise<void> {
    return firstValueFrom(this.http.delete<void>(`${baseUrl}/${id}`));
  }
}
