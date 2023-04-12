import { useState, useContext } from 'react';
import Step from './Step';
import { defaultSchedule } from '../data/default-schedule';
import { ScheduleStep } from '@/types/schedule';
import { EditPencil } from 'iconoir-react';

interface ScheduleProps {
  isNotificationsEnabled: boolean;
}

export default function Schedule({ isNotificationsEnabled }: ScheduleProps) {
  const [schedule, setSchedule] = useState<ScheduleStep[]>([...defaultSchedule]);
  const [activeStep, setActiveStep] = useState<number>(1);
  const [isComplete, setIsComplete] = useState<boolean>(false);

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

  const handleUpdateStep = (newStepData: ScheduleStep) => {
    const updatedStepIndex = schedule.findIndex((step) => step.id === newStepData.id);
    const newSchedule = [...schedule];
    newSchedule.splice(updatedStepIndex, 1, newStepData);
    setSchedule(newSchedule);
  }

  const deleteStep = () => {}

  const reorderStep = () => {}

  return (
    <>
      <div>
        {schedule.map(item => {
          return <Step key={item.stepNumber} step={item} isNotificationsEnabled={isNotificationsEnabled}
            isActive={activeStep === item.stepNumber} onSkip={() => onSkip(item)} onSaveStep={handleUpdateStep} />
        })}
      </div>

      { isComplete && <div className="text-center py-5">COMPLETE!</div> }
    </>
  )
}
