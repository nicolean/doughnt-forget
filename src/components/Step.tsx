import { useEffect, useState } from 'react';
import { ScheduleStep } from '@/interfaces/schedule.interface';
import StepTimer from './StepTimer';
import StepStopwatch from './StepStopwatch';
import StepForm from './StepForm';
import ScheduleStepActions from './ScheduleStepActions';

interface StepProps {
  step: ScheduleStep;
  isEditModeActive: boolean;
  isActive: boolean;
  isNotificationsEnabled: boolean;
  onSkip: () => void;
}

export default function Step({ step, isActive, isEditModeActive, isNotificationsEnabled, onSkip }: StepProps) {
  const [dynamicClasses, setDynamicClasses] = useState('');
  const [isStepEditActive, setIsStepEditActive] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    // TODO clean this up
    let classes = [];

    if (isEditModeActive) {
      classes.push('hover:bg-gray-100', 'hover:cursor-pointer');
    } else if (!isActive) {
      classes.push('text-gray-500');
    }

    if (isComplete) {
      classes.push('before:block', 'before:absolute', 'before:top-2/4', 'before:border-b', 'before:w-9/12', 'before:border-gray-700');
    }

    setDynamicClasses(classes.join(' '));
  }, [isActive, isComplete, isEditModeActive]);


  const onEditClick = () => {
    if (!isEditModeActive) {
      return;
    }

    console.log('edit', step);
    setIsStepEditActive((isStepEditActive) => !isStepEditActive);
  }

  const onSave = (newStepData: ScheduleStep) => {
    console.log('save', newStepData);
  }

  const onCancelEdit = () => {
    setIsStepEditActive(false);
  }

  return (
    <div className={`relative h-[3.625rem] not-last:border-b not-last:border-b-blue-300 ${dynamicClasses}`}>
      { isStepEditActive
        ? <div className="absolute top-2/4 -translate-y-2/4">
            <div className="relative z-10">
              <StepForm step={step} onSave={onSave} onCancel={onCancelEdit} />
            </div>
          </div>
        : <div className="grid grid-cols-12 p-4" onClick={onEditClick}>
            <div className="col-span-7">{ step.name }</div>
            { step.duration
              ? <StepTimer duration={step.duration} isActive={isActive} isComplete={isComplete} isEditModeActive={isEditModeActive} isNotificationsEnabled={isNotificationsEnabled} onComplete={setIsComplete} onSkip={onSkip} />
              : <StepStopwatch isActive={isActive} isEditModeActive={isEditModeActive} onComplete={setIsComplete} onSkip={onSkip} />
            }
          </div>
      }
    </div>
  )
}
