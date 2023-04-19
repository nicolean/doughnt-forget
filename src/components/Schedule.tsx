import { useState, useContext } from 'react';
import { EditContext } from '@/context/edit';
import { EditContextType } from '@/types/edit-context';
import Step from './Step';
import Button from './Button';
import StepForm from './StepForm';
import { defaultSchedule } from '@/data/default-schedule';
import { ScheduleStep } from '@/types/schedule';
import { Plus } from 'react-feather';
import JSConfetti from 'js-confetti';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';

interface ScheduleProps {
  isNotificationsEnabled: boolean;
}

const EMPTY_STEP  = {
  id: '',
  name: '',
  type: '',
  duration: '',
  actualDuration: 0,
  isCompleted: false,
}

export default function Schedule({ isNotificationsEnabled }: ScheduleProps) {
  const [schedule, setSchedule] = useState<ScheduleStep[]>([...defaultSchedule]);
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [newStepData, setNewStepData] = useState<ScheduleStep>(EMPTY_STEP);

  const { isEditModeActive, isAddStepActive, setIsAddStepActive } = useContext(EditContext) as EditContextType;

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const removeItem = (removedItem: ScheduleStep) => {
    let filteredSchedule = [...schedule].filter(item => item !== removedItem);
    setSchedule(filteredSchedule);
  }

  const onSkip = (step: ScheduleStep) => {
    // TODO handle total addition duration here in the future
    setActiveStepIndex(activeStepIndex + 1);
    handleUpdateStep(step);

    if ((activeStepIndex + 1) === schedule.length) {
      setIsComplete(true);
      const jsConfetti = new JSConfetti()
      jsConfetti.addConfetti({
        emojis: ['🥖', '🍞', '🥯', '🫓', '🥪', '🥐'],
        confettiNumber: 150,
      });
    }
  }

  const onScheduleReset = () => {
    const resetSchedule = schedule.map( step => ({
        ...step,
        actualDuration: 0,
        isCompleted: false
      })
    );

    setSchedule(resetSchedule);
    setActiveStepIndex(0);
    setIsComplete(false)
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
      }
    ];

    setSchedule(newSchedule);
  }

  const onAddStepCancel = () => {
    setIsAddStepActive(false);
    setNewStepData(EMPTY_STEP);
  }

  const deleteStep = (stepId: string) => {
    const newSchedule = schedule.filter((step) => step.id !== stepId);
    setSchedule(newSchedule);
  }

  // TODO define and implement logic for editing an already-started schedule
  const handleOnDragEnd = (event: any) => {
    const {active, over} = event;

    if (active.id !== over.id) {
      setSchedule((items) => {
        const oldIndex = schedule.findIndex((step) => step.id === active.id);
        const newIndex = schedule.findIndex((step) => step.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  return (
    <>
      { isEditModeActive
          ? <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleOnDragEnd}>
              <SortableContext items={schedule} strategy={verticalListSortingStrategy}>
                {schedule.map((item, index) => {
                  return <Step key={item.id} id={item.id} step={item} isNotificationsEnabled={isNotificationsEnabled}
                    isActive={activeStepIndex === index} onSkip={onSkip} onSaveStep={handleUpdateStep} onDeleteStep={deleteStep} />
                })}
              </SortableContext>
            </DndContext>
          : <div>
              {schedule.map((item, index) => {
                return <Step key={item.id} id={item.id} step={item} isNotificationsEnabled={isNotificationsEnabled}
                  isActive={activeStepIndex === index} onSkip={onSkip} onSaveStep={handleUpdateStep} onDeleteStep={deleteStep} />
              })}
            </div>
      }

      { isComplete &&
          <div className="text-center py-5">
            <p>COMPLETE!</p>
            <div className="mt-5">
              <Button ariaLabel="Reset schedule" onClick={onScheduleReset}>Reset</Button>
            </div>
          </div> }

      { isEditModeActive &&
        <div className="my-4 h-[3.625rem]">
          { isAddStepActive
            ? <StepForm step={newStepData} onSubmit={addStep} onCancel={onAddStepCancel} />
            : <Button ariaLabel="Add new step" onClick={() => setIsAddStepActive(true)}><Plus /></Button>
          }
        </div>
      }
    </>
  )
}
