import {ChangeDetectionStrategy, Component, OnInit, signal, WritableSignal} from '@angular/core';
import {CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray} from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { AddWidgetDialogComponent } from '../add-widget-dialog/add-widget-dialog.component';
import {NgForOf} from '@angular/common';
import {WidgetComponent} from '../widget/widget.component';
import { WidgetTypeAndProject} from '../../model/dashboardModel';
import { UUID } from "uuidjs";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  imports: [
    CdkDropList,
    NgForOf,
    WidgetComponent,
    CdkDrag
  ],
  styleUrls: ['./dashboard.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {
  widgets:WritableSignal<WidgetTypeAndProject[]> = signal([]);

  constructor( public dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadWidgets();
  }

  loadWidgets(): void {
    const savedWidgets = localStorage.getItem('dashboardWidgets');
    if (savedWidgets) {
      this.widgets.set(JSON.parse(savedWidgets)) ;
    }
  }

  saveWidgets(): void {
    localStorage.setItem('dashboardWidgets', JSON.stringify(this.widgets()));
  }

  addWidget(): void {
    const activeElement = document.activeElement as HTMLElement;
    if (activeElement) {
      activeElement.blur();
    }
    const dialogRef = this.dialog.open(AddWidgetDialogComponent, {
      width: '250px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.widgets.set([...this.widgets(),{
          id:UUID.generate(),
          project: result.project,
          widgetTypes: result.type
        }])
        this.saveWidgets();
      }
    });
  }

  removeWidget(widgetId: string): void {
    this.widgets.set(this.widgets().filter(widget => widget.id !== widgetId));
    this.saveWidgets();
  }

  drop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.widgets(), event.previousIndex, event.currentIndex);
    this.saveWidgets();
  }
}
