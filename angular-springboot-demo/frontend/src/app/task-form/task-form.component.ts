import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from '../models/task.model';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
  task: Task = { title: '', description: '', completed: false };
  isEditMode = false;
  errorMessage = '';

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEditMode = true;
      const id = Number(idParam);
      this.taskService.getTask(id).subscribe({
        next: (data) => (this.task = data),
        error: () => (this.errorMessage = 'Could not load task.')
      });
    }
  }

  onSubmit(): void {
    if (!this.task.title.trim()) {
      this.errorMessage = 'Title is required.';
      return;
    }

    if (this.isEditMode && this.task.id) {
      this.taskService.updateTask(this.task.id, this.task).subscribe({
        next: () => this.router.navigate(['/']),
        error: () => (this.errorMessage = 'Failed to update task.')
      });
    } else {
      this.taskService.createTask(this.task).subscribe({
        next: () => this.router.navigate(['/']),
        error: () => (this.errorMessage = 'Failed to create task.')
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/']);
  }
}
