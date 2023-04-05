import { ScheduleItem } from '../interfaces/schedule.interface';
import { Play, Pause, SkipNext } from 'iconoir-react';
import { useStopwatch } from 'react-timer-hook';
import ScheduleStepActions from './ScheduleStepActions';

interface ScheduleStepProps {
  item: ScheduleItem;
  isActive: boolean;
  onSkip: () => void;
}

export default function UntimedScheduleStep({ item, isActive, onSkip }: ScheduleStepProps) {
  const { seconds, minutes, hours, isRunning, start, pause } = useStopwatch({ autoStart: false });

  const timeString = [String(hours).padStart(2, "0"), String(minutes).padStart(2, "0"), String(seconds).padStart(2, "0")].join(':');

  const handleOnSkip = () => {
    // TODO may need to pass elapsed time in onSkip to add to total duration
    pause();
    onSkip();
  }

  return (
    <div className={`py-4 flex justify-between not-last:border-b ${ isActive ? null : 'text-gray-500' }`}>
      <div className="basis-6/12">{ item.name }</div>
      <div className="basis-2/12">{ timeString }</div>
      <div className="basis-2/12 flex justify-end">
        { isActive &&
          <ScheduleStepActions isPlaying={isRunning} onStart={start} onPause={pause} onSkip={handleOnSkip} />
        }
      </div>
    </div>
  )
}
