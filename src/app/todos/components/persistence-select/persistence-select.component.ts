import { ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'persistence-select',
  templateUrl: './persistence-select.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersistenceSelectComponent {
  persistence: string;

  constructor() {
    const current = localStorage.getItem('todos-angular.persistence');
    this.persistence = current === 'http' ? current : 'local';
  }

  handleChange(name: string) {
    localStorage.setItem('todos-angular.persistence', name);
    window.location.reload();
  }
}
