import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodosShellComponent } from './components/todos-shell/todos-shell.component';
import { TodosInputComponent } from './components/todos-input/todos-input.component';
import { TodosMainComponent } from './components/todos-main/todos-main.component';
import { TodosToolbarComponent } from './components/todos-toolbar/todos-toolbar.component';
import { TodosListComponent } from './components/todos-list/todos-list.component';
import { TodosItemComponent } from './components/todos-item/todos-item.component';
import { SetFocusedDirective } from './directives/set-focused.directive';
import { PluralizePipe } from './pipes/pluralize.pipe';
import { PERSISTENCE } from './services/persistence.interface';
import { LocalPersistenceService } from './services/local-persistence.service';
import { HttpPersistenceService } from './services/http-persistence.service';
import { HttpClient } from '@angular/common/http';
import { PersistenceSelectComponent } from './components/persistence-select/persistence-select.component';

@NgModule({
  declarations: [
    TodosShellComponent,
    TodosInputComponent,
    TodosMainComponent,
    TodosToolbarComponent,
    TodosListComponent,
    TodosItemComponent,
    SetFocusedDirective,
    PluralizePipe,
    PersistenceSelectComponent,
  ],
  imports: [CommonModule],
  exports: [TodosShellComponent],
  providers: [
    {
      provide: PERSISTENCE,
      useFactory: persistenceFactory,
      deps: [HttpClient],
    },
  ],
})
export class TodosModule {}

function persistenceFactory(http: HttpClient) {
  const persistenceName = localStorage.getItem('todos-angular.persistence');
  return persistenceName === 'http' ? new HttpPersistenceService(http) : new LocalPersistenceService();
}
