import { useState, useContext } from 'react';
import { EditContext } from '@/context/edit';
import { EditContextType } from '@/types/edit-context';
import Step from './Step';
import Button from './Button';
import StepForm from './StepForm';
import { defaultSchedule } from '@/data/default-schedule';
import { ScheduleStep } from '@/types/schedule';
import { Plus } from 'iconoir-react';

interface ScheduleProps {
  isNotificationsEnabled: boolean;
}

const EMPTY_STEP  = {
  id: '',
  stepNumber: 0,
  name: '',
  type: '',
  duration: '',
  actualDuration: '',
  completed: false,
}

export default function Schedule({ isNotificationsEnabled }: ScheduleProps) {
  const [schedule, setSchedule] = useState<ScheduleStep[]>([...defaultSchedule]);
  const [activeStepNumber, setActiveStepNumber] = useState<number>(1);
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [newStepData, setNewStepData] = useState<ScheduleStep>(EMPTY_STEP);

  const { isEditModeActive, isAddStepActive, setIsAddStepActive } = useContext(EditContext) as EditContextType;

  // TODO may need to add sorting to schedule based on stepNumber

  const removeItem = (removedItem: ScheduleStep) => {
    let filteredSchedule = [...schedule].filter(item => item !== removedItem);
    setSchedule(filteredSchedule);
  }

  const onSkip = (item: ScheduleStep) => {
    // TODO handle total addition duration here in the future
    setActiveStepNumber(Number(activeStepNumber) + 1);
    if (activeStepNumber === schedule.length) {
      setIsComplete(true);
    }
  }

  const handleUpdateStep = (newStepData: ScheduleStep) => {
    const updatedStepIndex = schedule.findIndex((step) => step.id === newStepData.id);
    const newSchedule = [...schedule];
    newSchedule.splice(updatedStepIndex, 1, newStepData);
    setSchedule(newSchedule);
  }

  const addStep = (newStep: ScheduleStep) => {
    const newSchedule = [
      ...schedule,
      {
        ...newStep,
        id: crypto.randomUUID(),
        stepNumber: schedule.length + 1
      }
    ];

    setSchedule(newSchedule);
  }

  const onAddStepCancel = () => {
    setIsAddStepActive(false);
    setNewStepData(EMPTY_STEP);
  }

  const deleteStep = (id: string) => {}

  // TODO const reorderStep = () => {}

  return (
    <>
      <div>
        {schedule.map(item => {
          return <Step key={item.id} step={item} isNotificationsEnabled={isNotificationsEnabled}
            isActive={activeStepNumber === item.stepNumber} onSkip={() => onSkip(item)} onSaveStep={handleUpdateStep} />
        })}
      </div>

      { isComplete && <div className="text-center py-5">COMPLETE!</div> }

      { isEditModeActive &&
        <div className="my-2 h-[3.625rem]">
          { isAddStepActive
            ? <StepForm step={newStepData} onSubmit={addStep} onCancel={onAddStepCancel} />
            : <Button ariaLabel="Add new step" onClick={() => setIsAddStepActive(true)}><Plus /></Button>
          }
        </div>
      }
    </>
  )
}
