import { useEffect, useState, useContext } from 'react';
import { EditContext } from '../context/edit';
import { EditContextType } from '@/types/edit-context';
import { ScheduleStep } from '@/types/schedule';
import { useSortable } from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import StepTimer from './StepTimer';
import StepStopwatch from './StepStopwatch';
import StepForm from './StepForm';
import ScheduleStepActions from './ScheduleStepActions';


interface StepProps {
  step: ScheduleStep;
  isActive: boolean;
  isNotificationsEnabled: boolean;
  onSkip: (step: ScheduleStep) => void;
  onSaveStep: (newStepData: ScheduleStep) => void;
  onDeleteStep: (stepId: string) => void;
  id: string;
}

export default function Step({ id, step, isActive, isNotificationsEnabled, onSkip, onSaveStep, onDeleteStep }: StepProps) {
  const { isEditModeActive, activeEditStepId, updateActiveEditStep } = useContext(EditContext) as EditContextType;

  const [dynamicClasses, setDynamicClasses] = useState<string>();
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({id: id});

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  useEffect(() => {
    // TODO clean this up
    let classes = [];

    if (isEditModeActive) {
      classes.push('hover:bg-gray-100', 'hover:cursor-pointer');
    } else if (!isActive) {
      classes.push('text-gray-500');
    }

    if (step.isCompleted) {
      classes.push('before:block', 'before:absolute', 'before:top-2/4', 'before:border-b', 'before:w-9/12', 'before:border-gray-700');
    }

    setDynamicClasses(classes.join(' '));
  }, [step, isActive, isEditModeActive]);

  const handleOnSkip = (elapsedSeconds: number) => {
    const updatedStep = {
      ...step,
      isCompleted: true,
      actualDuration: elapsedSeconds,
    };
    onSkip(updatedStep);

  }

  const onEditClick = () => {
    if (!isEditModeActive || isComplete) {
      return;
    }

    updateActiveEditStep(step.id);
  }

  const onSubmit = (newStepData: ScheduleStep) => {
    onSaveStep(newStepData);
    updateActiveEditStep('');
  }

  return (
    <div className={`relative h-[3.625rem] bg-white not-last:border-b not-last:border-b-blue-300 ${dynamicClasses}`} style={style} ref={setNodeRef} {...attributes} {...listeners}>
      { isEditModeActive && activeEditStepId === step.id
        ? <div className="absolute top-2/4 -translate-y-2/4 z-10">
            <div className="relative">
              <StepForm step={step} onSubmit={onSubmit} onCancel={() => updateActiveEditStep('')} onDeleteStep={onDeleteStep} />
            </div>
          </div>
        : <div className="grid grid-cols-12 py-4 px-2 sm:p-4" onClick={onEditClick}>
            <div className="col-span-7">{ step.name }</div>
            { step.duration
              ? <StepTimer stepName={step.name} duration={step.duration} isActive={isActive} isComplete={step.isCompleted} isNotificationsEnabled={isNotificationsEnabled} onSkip={handleOnSkip} />
              : <StepStopwatch isActive={isActive} onSkip={handleOnSkip} />
            }
          </div>
      }
    </div>
  )
}
