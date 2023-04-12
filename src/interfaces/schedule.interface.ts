export interface ScheduleStep {
  id: number;
  stepNumber: number;
  name: string;
  type: string;
  duration: string;
  actualDuration: string;
  completed: boolean;
}
