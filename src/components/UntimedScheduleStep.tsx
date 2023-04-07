import { useState } from 'react';
import { ScheduleItem } from '../interfaces/schedule.interface';
import { Play, Pause, SkipNext } from 'iconoir-react';
import { useStopwatch } from 'react-timer-hook';
import StepContainer from './StepContainer';
import ScheduleStepActions from './ScheduleStepActions';

interface ScheduleStepProps {
  item: ScheduleItem;
  isActive: boolean;
  isEditModeActive: boolean;
  onSkip: () => void;
}

export default function UntimedScheduleStep({ item, isActive, isEditModeActive, onSkip }: ScheduleStepProps) {
  const [isComplete, setIsComplete] = useState(false);

  const { seconds, minutes, hours, isRunning, start, pause } = useStopwatch({ autoStart: false });

  const timeString = [String(hours).padStart(2, "0"), String(minutes).padStart(2, "0"), String(seconds).padStart(2, "0")].join(':');

  const handleOnSkip = () => {
    // TODO may need to pass elapsed time in onSkip to add to total duration
    setIsComplete(true);
    pause();
    onSkip();
  }

  const onEditClick = () => {
    console.log('edit', item);
  }

  return (
    <StepContainer isActive={isActive} isComplete={isComplete} isEditModeActive={isEditModeActive}>
      <div className="basis-6/12">{ item.name }</div>
      <div className="basis-2/12">{ timeString }</div>
      <div className="basis-2/12 flex justify-end">
        { isActive && !isEditModeActive &&
          <ScheduleStepActions isPlaying={isRunning} onStart={start} onPause={pause} onSkip={handleOnSkip} isEditModeActive={isEditModeActive} onEditClick={onEditClick} />
        }
      </div>
    </StepContainer>
  )
}
