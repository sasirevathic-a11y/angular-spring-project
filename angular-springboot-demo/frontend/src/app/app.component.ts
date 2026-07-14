import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'task-manager-frontend';
  ngOnInit(): void {
    console.log('AppComponent initialized');
  }
  
}
