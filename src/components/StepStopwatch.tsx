import { useState, useContext } from 'react';
import { useStopwatch } from 'react-timer-hook';
import { EditContext } from '@/context/edit';
import { EditContextType } from '@/types/edit-context';
import ScheduleStepActions from './ScheduleStepActions';

interface StepStopwatchProps {
  isActive: boolean;
  onComplete: (value: boolean) => void;
  onSkip: () => void;
}

export default function StepStopwatch({ isActive, onComplete, onSkip }: StepStopwatchProps) {
  const { isEditModeActive } = useContext(EditContext) as EditContextType;

  const { seconds, minutes, hours, isRunning, start, pause } = useStopwatch({ autoStart: false });

  const timeString = [String(hours).padStart(2, "0"), String(minutes).padStart(2, "0"), String(seconds).padStart(2, "0")].join(':');

  const handleOnSkip = () => {
    // TODO may need to pass elapsed time in onSkip to add to total duration
    onComplete(true);
    pause();
    onSkip();
  }

  return (
    <>
      <div className="col-span-3">{ timeString }</div>
      <div className="col-span-2 flex justify-end">
        { isActive && !isEditModeActive &&
          <ScheduleStepActions isPlaying={isRunning} onStart={start} onPause={pause} onSkip={handleOnSkip} />
        }
      </div>
    </>
  )
}
