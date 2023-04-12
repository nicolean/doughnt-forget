import { useState } from 'react';
import Step from './Step';
import Button from './Button';
import { defaultSchedule } from '../data/default-schedule';
import { ScheduleStep } from '@/interfaces/schedule.interface';
import { EditPencil } from 'iconoir-react';

interface ScheduleProps {
  isNotificationsEnabled: boolean;
}

export default function Schedule({ isNotificationsEnabled }: ScheduleProps) {
  const [schedule, setSchedule] = useState<ScheduleStep[]>([...defaultSchedule]);
  const [activeStep, setActiveStep] = useState<Number>(1);
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [isEditModeActive, setIsEditModeActive] = useState<boolean>(false);

  // TODO may need to add sorting to schedule based on stepNumber

  const removeItem = (removedItem: ScheduleStep) => {
    let filteredSchedule = [...schedule].filter(item => item !== removedItem);
    setSchedule(filteredSchedule);
  }

  const onSkip = (item: ScheduleStep) => {
    // TODO handle total addition duration here in the future
    setActiveStep(Number(activeStep) + 1);
    if (activeStep === schedule.length) {
      setIsComplete(true);
    }
  }

  const handleEditToggle = () => {
    setIsEditModeActive(isEditModeActive => !isEditModeActive);
  }

  const updateStep = (step: ScheduleStep) => {
    console.log('updateStep', step);
  }

  const deleteStep = () => {}

  const reorderStep = () => {}

  return (
    <>
      <div>
        {schedule.map(item => {
          return <Step key={item.stepNumber} step={item} isEditModeActive={isEditModeActive} isNotificationsEnabled={isNotificationsEnabled} isActive={activeStep === item.stepNumber} onSkip={() => onSkip(item)} />
        })}
      </div>
      <Button onClick={handleEditToggle}>Edit <EditPencil /></Button>
      { isComplete && <div className="text-center py-5">COMPLETE!</div> }
    </>
  )
}
