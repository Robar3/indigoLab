import { Injectable } from '@angular/core';
import {of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private projects = [
    {
      id: 1,
      name: 'Проект A',
      tasksCompleted: 25,
      tasksTotal: 100,
      startDate: '2024-01-01',
      endDate: '2024-12-31'
    },
    {
      id: 2,
      name: 'Проект B',
      tasksCompleted: 75,
      tasksTotal: 140,
      startDate: '2023-06-01',
      endDate: '2024-03-31'
    },
    {
      id: 3,
      name: 'Проект C',
      tasksCompleted: 80,
      tasksTotal: 85,
      startDate: '2024-06-01',
      endDate: '2024-09-30'
    }
  ];

  getProjects() {
    return of(this.projects);
  }
}
