import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersistenceSelectComponent } from './persistence-select.component';

describe('PersistenceSelectComponent', () => {
  let component: PersistenceSelectComponent;
  let fixture: ComponentFixture<PersistenceSelectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PersistenceSelectComponent]
    });
    fixture = TestBed.createComponent(PersistenceSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
