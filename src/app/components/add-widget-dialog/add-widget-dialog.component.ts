import {ChangeDetectionStrategy, Component, Inject, model, ModelSignal, signal, WritableSignal} from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions
} from '@angular/material/dialog';
import { ProjectService } from '../../services/project.service';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatOption, MatSelect, MatSelectModule} from '@angular/material/select';
import {FormsModule} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {Project} from '../../model/dashboardModel';

@Component({
  selector: 'app-add-widget-dialog',
  templateUrl: './add-widget-dialog.component.html',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatFormField,
    MatSelect,
    MatLabel,
    FormsModule,
    MatButton,
    MatDialogActions,
    MatSelectModule
  ],
  styleUrls: ['./add-widget-dialog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddWidgetDialogComponent {
  projects: WritableSignal<Project[]> = signal([]);
  selectedProject:ModelSignal<string|undefined> = model();
  widgetType = model('progress');

  constructor(
    public dialogRef: MatDialogRef<AddWidgetDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private projectService: ProjectService
  ) {
    this.projectService.getProjects().subscribe(projects => {
      this.projects.set(projects) ;
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addWidget(): void {
    this.dialogRef.close({
      project: this.selectedProject(),
      type: this.widgetType()
    });
  }
}
