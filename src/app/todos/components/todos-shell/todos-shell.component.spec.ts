import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodosShellComponent } from './todos-shell.component';

describe('TodosShellComponent', () => {
  let component: TodosShellComponent;
  let fixture: ComponentFixture<TodosShellComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TodosShellComponent]
    });
    fixture = TestBed.createComponent(TodosShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
