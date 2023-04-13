export interface ScheduleStep {
  id: string;
  stepNumber: number;
  name: string;
  type: string;
  duration: string;
  actualDuration: string;
  completed: boolean;
}
