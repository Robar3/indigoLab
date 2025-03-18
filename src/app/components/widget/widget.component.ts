import {ChangeDetectionStrategy, Component, computed, EventEmitter, Input, Output} from '@angular/core';
import {WidgetTypeAndProject} from '../../model/dashboardModel';
import {MatProgressBar} from '@angular/material/progress-bar';
import {DatePipe} from '@angular/common';
import {MatIcon} from '@angular/material/icon';
import {MatTooltip} from '@angular/material/tooltip';

@Component({
  selector: 'app-widget',
  imports: [
    MatProgressBar,
    DatePipe,
    MatIcon,
    MatTooltip
  ],
  templateUrl: './widget.component.html',
  styleUrl: './widget.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WidgetComponent {
  @Input() widget!: WidgetTypeAndProject;
  @Output() widgetDelete = new EventEmitter();

  progress = computed(() => {
    if (this.widget.project.tasksTotal === 0) {
      return 0;
    }
    return Math.round((this.widget.project.tasksCompleted / this.widget.project.tasksTotal) * 100);
  })

  delete(){
    this.widgetDelete.emit(this.widget.id);
  }
}
