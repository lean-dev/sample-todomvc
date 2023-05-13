import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodosToolbarComponent } from './todos-toolbar.component';

describe('TodosToolbarComponent', () => {
  let component: TodosToolbarComponent;
  let fixture: ComponentFixture<TodosToolbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TodosToolbarComponent]
    });
    fixture = TestBed.createComponent(TodosToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
