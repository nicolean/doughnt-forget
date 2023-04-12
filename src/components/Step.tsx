import { useEffect, useState, useContext } from 'react';
import { EditContext } from '../context/edit';
import { EditContextType } from '@/types/edit-context';
import { ScheduleStep } from '@/types/schedule';
import StepTimer from './StepTimer';
import StepStopwatch from './StepStopwatch';
import StepForm from './StepForm';
import ScheduleStepActions from './ScheduleStepActions';

interface StepProps {
  step: ScheduleStep;
  isActive: boolean;
  isNotificationsEnabled: boolean;
  onSkip: () => void;
  onSaveStep: (newStepData: ScheduleStep) => void;
}

export default function Step({ step, isActive, isNotificationsEnabled, onSkip, onSaveStep }: StepProps) {
  const { isEditModeActive, activeEditStep, updateActiveEditStep } = useContext(EditContext) as EditContextType;

  const [dynamicClasses, setDynamicClasses] = useState<string>();
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [isRunning, setIsRunning] = useState<boolean>(false);

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
    if (!isEditModeActive || isComplete) {
      return;
    }

    updateActiveEditStep(step.id);
  }

  const onSubmit = (newStepData: ScheduleStep) => {
    onSaveStep(newStepData);
    updateActiveEditStep(-1);
  }

  return (
    <div className={`relative h-[3.625rem] not-last:border-b not-last:border-b-blue-300 ${dynamicClasses}`}>
      { isEditModeActive && activeEditStep === step.id
        ? <div className="absolute top-2/4 -translate-y-2/4">
            <div className="relative z-10">
              <StepForm step={step} onSubmit={onSubmit} onCancel={() => updateActiveEditStep(-1)} />
            </div>
          </div>
        : <div className="grid grid-cols-12 p-4" onClick={onEditClick}>
            <div className="col-span-7">{ step.name }</div>
            { step.duration
              ? <StepTimer stepName={step.name} duration={step.duration} isActive={isActive} isComplete={isComplete} isNotificationsEnabled={isNotificationsEnabled} onComplete={setIsComplete} onSkip={onSkip} />
              : <StepStopwatch isActive={isActive} onComplete={setIsComplete} onSkip={onSkip} />
            }
          </div>
      }
    </div>
  )
}
