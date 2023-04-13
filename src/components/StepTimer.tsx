import { useState, useContext } from 'react';
import { useTimer } from 'react-timer-hook';
import { EditContext } from '@/context/edit';
import { EditContextType } from '@/types/edit-context';
import ScheduleStepActions from './ScheduleStepActions';

interface TimedScheduleStepProps {
  stepName: string;
  duration: string;
  isActive: boolean; // ?
  isComplete: boolean;
  isNotificationsEnabled: boolean;
  onComplete: (value: boolean) => void;
  onSkip: () => void;
}

export default function StepTimer({ stepName, duration, isActive, isComplete, isNotificationsEnabled, onComplete, onSkip }: TimedScheduleStepProps) {
  const { isEditModeActive } = useContext(EditContext) as EditContextType;

  const calculateExpiryTimestamp = () => {
    const time = new Date();
    const [ hours, minutes ] = (duration).split(':').map(i => parseInt(i));
    const seconds = (hours * 60 * 60) + (minutes * 60);
    time.setSeconds(time.getSeconds() + seconds);
    return time;
  }

  const [expiryTimestamp, setExpiryTimestamp] = useState(calculateExpiryTimestamp);

  const { seconds, minutes, hours, isRunning, start, pause, resume } = useTimer({
    expiryTimestamp,
    autoStart: false,
    onExpire: () => {
      onComplete(true);
      if (!isNotificationsEnabled) {
        return;
      }

      new Notification('doughnt forget!', {body: `${stepName} is complete`, icon: '/favicon.svg'});
    }
  })

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
          ( isComplete
            ? <button onClick={onSkip}>Next</button>
            : <ScheduleStepActions isPlaying={isRunning} onStart={start} onPause={pause} onSkip={handleOnSkip} />
          )
        }
      </div>
    </>
  )
}
