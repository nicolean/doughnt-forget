import { useState } from 'react';
import TimedScheduleStep from './TimedScheduleStep';
import UntimedScheduleStep from './UntimedScheduleStep';
import Button from './Button';
import { defaultSchedule } from '../data/default-schedule';
import { ScheduleItem } from '@/interfaces/schedule.interface';
import { EditPencil } from 'iconoir-react';

interface ScheduleProps {
  isNotificationsEnabled: boolean;
}

export default function Schedule({ isNotificationsEnabled }: ScheduleProps) {
  const [schedule, setSchedule] = useState<ScheduleItem[]>([...defaultSchedule]);
  const [activeStep, setActiveStep] = useState<Number>(1);
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [isEditModeActive, setIsEditModeActive] = useState<boolean>(false);

  const removeItem = (removedItem: ScheduleItem) => {
    let filteredSchedule = [...schedule].filter(item => item !== removedItem);
    setSchedule(filteredSchedule);
  }

  const onSkip = (item: ScheduleItem) => {
    // TODO handle total addition duration here in the future
    setActiveStep(activeStep + 1);
    if (activeStep === schedule.length) {
      setIsComplete(true);
    }
  }

  const handleEditToggle = () => {
    setIsEditModeActive(isEditModeActive => !isEditModeActive);
  }

  return (
    <>
      <div>
        {schedule.map(item => {
          if (item.duration) {
            return <TimedScheduleStep key={item.stepNumber} item={item} isActive={activeStep === item.stepNumber} onSkip={() => onSkip(item)} isNotificationsEnabled={isNotificationsEnabled} isEditModeActive={isEditModeActive} />
          } else {
            return <UntimedScheduleStep key={item.stepNumber} item={item} isActive={activeStep === item.stepNumber} onSkip={() => onSkip(item)} isEditModeActive={isEditModeActive} />
          }
        })}
      </div>
      <Button onClick={handleEditToggle}>Edit <EditPencil /></Button>
      { isComplete &&
        <div className="text-center py-5">COMPLETE!</div>
      }
    </>
  )
}
