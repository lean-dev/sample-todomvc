import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodosMainComponent } from './todos-main.component';

describe('TodosMainComponent', () => {
  let component: TodosMainComponent;
  let fixture: ComponentFixture<TodosMainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TodosMainComponent]
    });
    fixture = TestBed.createComponent(TodosMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
