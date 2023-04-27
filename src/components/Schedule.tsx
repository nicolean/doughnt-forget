import { useState, useContext } from 'react';
import { EditContext } from '@/context/edit';
import { EditContextType } from '@/types/edit-context';
import { ScheduleContext } from '@/context/schedule';
import { ScheduleContextType } from '@/types/schedule';
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
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [newStepData, setNewStepData] = useState<ScheduleStep>(EMPTY_STEP);
  const [totalDuration, setTotalDuration] = useState<number>(0);
  const [totalDurationString, setTotalDurationString] = useState<string>('00:00:00');

  const { isEditModeActive, isAddStepActive, setIsAddStepActive } = useContext(EditContext) as EditContextType;
  const { schedule, setSchedule } = useContext(ScheduleContext) as ScheduleContextType;

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const onSkip = (step: ScheduleStep) => {
    updateTotalDuration(step.actualDuration);
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

  const updateTotalDuration = (secondsToAdd: number) => {
    const newTotalDuration = totalDuration + secondsToAdd;
    setTotalDuration(newTotalDuration);

    let h = Math.floor(newTotalDuration / 3600);
    let m = Math.floor(newTotalDuration % 3600 / 60);
    let s = Math.floor(newTotalDuration % 3600 % 60);
    setTotalDurationString([String(h).padStart(2, "0"), String(m).padStart(2, "0"), String(s).padStart(2, "0")].join(':'));
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
    setTotalDuration(0);
    setTotalDurationString('00:00:00');
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
      const oldIndex = schedule.findIndex((step) => step.id === active.id);
      const newIndex = schedule.findIndex((step) => step.id === over.id);
      const newSchedule = arrayMove(schedule, oldIndex, newIndex);

      setSchedule(newSchedule);
    }
  }

  return (
    <div>
      { isEditModeActive
        ?
          <>
            {schedule.map((item, index) => {
              if (item.isCompleted) {
                return <Step key={item.id} id={item.id} step={item} isNotificationsEnabled={isNotificationsEnabled}
                  isActive={activeStepIndex === index} onSkip={onSkip} onSaveStep={handleUpdateStep} onDeleteStep={deleteStep} />
              }
            })}
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleOnDragEnd}>
              <SortableContext items={schedule} strategy={verticalListSortingStrategy}>
                {schedule.map((item, index) => {
                  if (!item.isCompleted) {
                    return <Step key={item.id} id={item.id} step={item} isNotificationsEnabled={isNotificationsEnabled}
                      isActive={activeStepIndex === index} onSkip={onSkip} onSaveStep={handleUpdateStep} onDeleteStep={deleteStep} />
                  }
                })}
              </SortableContext>
            </DndContext>
          </>
        : <div>
            {schedule.map((item, index) => {
              return <Step key={item.id} id={item.id} step={item} isNotificationsEnabled={isNotificationsEnabled}
                isActive={activeStepIndex === index} onSkip={onSkip} onSaveStep={handleUpdateStep} onDeleteStep={deleteStep} />
            })}
          </div>
      }

      { isEditModeActive &&
        <div className="my-4 h-[3.625rem]">
          { isAddStepActive
            ? <StepForm step={newStepData} onSubmit={addStep} onCancel={onAddStepCancel} />
            : <Button ariaLabel="Add new step" onClick={() => setIsAddStepActive(true)}><Plus /></Button>
          }
        </div>
      }

      { !isEditModeActive &&
        <>
          <div className="grid grid-cols-12 py-4 px-2 sm:p-4 border-t border-t-blue-300">
            <div className="col-span-6 sm:col-span-7">
              Total Time
            </div>
            <div className="col-span-4 sm:col-span-3">
              { totalDurationString }
            </div>
          </div>

          { isComplete &&
            <div className="text-center py-5">
              <p>COMPLETE!</p>
              <div className="mt-3">
                <Button ariaLabel="Reset schedule" onClick={onScheduleReset}>Reset</Button>
              </div>
            </div>
          }
        </>
      }
    </div>
  )
}
