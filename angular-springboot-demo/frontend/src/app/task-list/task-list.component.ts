import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Task } from '../models/task.model';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  errorMessage = '';

  constructor(private taskService: TaskService, private router: Router) {}

  ngOnInit(): void {
    console.log('TaskListComponent initialized');
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe({
      next: (data) => (this.tasks = data),
      error: () => (this.errorMessage = 'Failed to load tasks. Is the backend running?')
    });
  }

  toggleCompleted(task: Task): void {
    const updated = { ...task, completed: !task.completed };
    this.taskService.updateTask(task.id!, updated).subscribe({
      next: () => this.loadTasks(),
      error: () => (this.errorMessage = 'Failed to update task.')
    });
  }

  deleteTask(id: number): void {
    if (!confirm('Delete this task?')) {
      return;
    }
    this.taskService.deleteTask(id).subscribe({
      next: () => this.loadTasks(),
      error: () => (this.errorMessage = 'Failed to delete task.')
    });
  }

  editTask(id: number): void {
    this.router.navigate(['/edit', id]);
  }

  goToNewTask(): void {
    this.router.navigate(['/new']);
  }
}
