export interface ScheduleStep {
  id: string;
  stepNumber: number;
  name: string;
  type: string;
  duration: string;
  actualDuration: number;
  isCompleted: boolean;
}

export interface StepFormData {
  name: string;
  duration?: string;
}
