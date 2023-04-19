import { useState, useContext } from 'react';
import { useTimer } from 'react-timer-hook';
import { EditContext } from '@/context/edit';
import { EditContextType } from '@/types/edit-context';
import ScheduleStepActions from './ScheduleStepActions';

interface TimedScheduleStepProps {
  stepName: string;
  duration: string;
  isActive: boolean;
  isComplete: boolean;
  isNotificationsEnabled: boolean;
  onSkip: (elapsedSeconds: number) => void;
}

export default function StepTimer({ stepName, duration, isActive, isComplete, isNotificationsEnabled, onSkip }: TimedScheduleStepProps) {
  const { isEditModeActive } = useContext(EditContext) as EditContextType;
  const [isTimerComplete, setIsTimerComplete] = useState<boolean>(false);
  const [totalSeconds, setTotalSeconds] = useState<number>(0);

  const calculateExpiryTimestamp = () => {
    const time = new Date();
    const [ hours, minutes ] = (duration).split(':').map(i => parseInt(i));
    const seconds = (hours * 60 * 60) + (minutes * 60);
    setTotalSeconds(seconds);
    time.setSeconds(time.getSeconds() + seconds);
    return time;
  }

  const [expiryTimestamp, setExpiryTimestamp] = useState(calculateExpiryTimestamp);

  const { seconds, minutes, hours, isRunning, start, pause, resume } = useTimer({
    expiryTimestamp,
    autoStart: false,
    onExpire: () => {
      setIsTimerComplete(true);
      if (!isNotificationsEnabled) {
        return;
      }

      new Notification('doughnt forget!', {body: `${stepName} is complete`, icon: '/favicon.svg'});
    }
  })

  const timeString = [String(hours).padStart(2, "0"), String(minutes).padStart(2, "0"), String(seconds).padStart(2, "0")].join(':');

  const handleOnSkip = () => {
    pause();

    const elapsedSeconds = totalSeconds - ((hours * 60 * 60) + (minutes * 60) + seconds);
    onSkip(elapsedSeconds);
  }

  // TODO find a way to extract these column definitions here since they're shred in StepStopwatch & Schedule
  return (
    <>
      <div className="col-span-4 sm:col-span-3">{ timeString }</div>
      { isActive && !isEditModeActive &&
        <div className="col-span-2 flex justify-end">
          { isTimerComplete
            ? <button onClick={() => onSkip(totalSeconds)}>Next</button>
            : <ScheduleStepActions isPlaying={isRunning} onStart={start} onPause={pause} onSkip={handleOnSkip} />
          }
        </div>
      }
    </>
  )
}
