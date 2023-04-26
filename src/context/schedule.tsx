import { createContext, useState } from 'react';
import { ScheduleStep, ScheduleContextType } from '@/types/schedule';
import { defaultSchedule } from '@/data/default-schedule';

interface ScheduleProviderProps {
  children: React.ReactNode;
}

const ScheduleContext = createContext<ScheduleContextType | null>(null);

function ScheduleProvider({ children }: ScheduleProviderProps) {
  const [schedule, setSchedule] = useState<ScheduleStep[]>([...defaultSchedule]);

  // TODO may move delete, add reset here
  const value = {
    schedule: schedule,
    setSchedule: (newSchedule: ScheduleStep[]) => setSchedule(newSchedule)
  }

  return (
    <ScheduleContext.Provider value={value}>
      { children }
    </ScheduleContext.Provider>
  )
}

export { ScheduleContext, ScheduleProvider };
