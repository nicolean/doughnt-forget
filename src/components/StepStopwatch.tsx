import { useState, useContext } from 'react';
import { useStopwatch } from 'react-timer-hook';
import { EditContext } from '@/context/edit';
import { EditContextType } from '@/types/edit-context';
import ScheduleStepActions from './ScheduleStepActions';

interface StepStopwatchProps {
  isActive: boolean;
  onSkip: (elapsedSeconds: number) => void;
}

export default function StepStopwatch({ isActive, onSkip }: StepStopwatchProps) {
  const { isEditModeActive } = useContext(EditContext) as EditContextType;

  const { seconds, minutes, hours, isRunning, start, pause } = useStopwatch({ autoStart: false });

  const timeString = [String(hours).padStart(2, "0"), String(minutes).padStart(2, "0"), String(seconds).padStart(2, "0")].join(':');

  const handleOnSkip = () => {
    pause();

    const elapsedSeconds = (hours * 60 * 60) + (minutes * 60) + seconds;
    onSkip(elapsedSeconds);
  }

  return (
    <>
      <div className="col-span-3">{ timeString }</div>
      { isActive && !isEditModeActive &&
        <div className="col-span-2 flex justify-end">
          <ScheduleStepActions isPlaying={isRunning} onStart={start} onPause={pause} onSkip={handleOnSkip} />
        </div>
      }
    </>
  )
}
