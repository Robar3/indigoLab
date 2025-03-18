export type Project = {
  id: number;
  name: string;
  tasksCompleted: number;
  tasksTotal: number;
  startDate: string;
  endDate: string;
};
export type WidgetType = "progress" | "taskStats" | 'dates';

export type WidgetTypeAndProject = {
  id: number;
  project: Project;
  widgetTypes: WidgetType;
}
