export interface ScheduleStep {
  id: string;
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

export interface ScheduleContextType {
  schedule: ScheduleStep[],
  setSchedule: (newSchedule: ScheduleStep[]) => void,
}
