import { useState, useEffect } from 'react';
import { ScheduleItem } from '../interfaces/schedule.interface'
import { useTimer } from 'react-timer-hook';
import StepContainer from './StepContainer';
import ScheduleStepActions from './ScheduleStepActions';

interface ScheduleStepProps {
  item: ScheduleItem;
  isActive: boolean;
  isEditModeActive: boolean;
  isNotificationsEnabled: boolean;
  onSkip: () => void;
}

export default function ScheduleStep({ item, isActive, isEditModeActive, isNotificationsEnabled, onSkip }: ScheduleStepProps) {
  useEffect(() => {
    console.log('isEditModeActive', isEditModeActive)
  }, [isEditModeActive]);


  const calculateExpiryTimestamp = () => {
    const time = new Date();
    const [ hours, minutes ] = (item.duration).split(':').map(i => parseInt(i));
    const seconds = (hours * 60 * 60) + (minutes * 60);
    time.setSeconds(time.getSeconds() + seconds);
    return time;
  }

  const [isComplete, setIsComplete] = useState(false);
  const [expiryTimestamp, setExpiryTimestamp] = useState(calculateExpiryTimestamp);

  const { seconds, minutes, hours, isRunning, start, pause, resume } = useTimer({
    expiryTimestamp,
    autoStart: false,
    onExpire: () => {
      setIsComplete(true);
      if (!isNotificationsEnabled) {
        return;
      }

      new Notification('doughnt forget!', {body: `${item.name} is complete`, icon: '/favicon.svg'});
    }
  })

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
          ( isComplete
            ? <button onClick={onSkip}>Next</button>
            : <ScheduleStepActions isPlaying={isRunning} onStart={start} onPause={pause} onSkip={handleOnSkip} isEditModeActive={isEditModeActive} onEditClick={onEditClick} />
          )
        }
      </div>
    </StepContainer>
  )
}
