import { ScheduleItem } from "../interfaces/schedule.interface"
import ScheduleStepActions from "./schedule-step-actions";
import { useTimer } from "react-timer-hook";
import { useMemo, useState } from "react";

interface ScheduleStepProps {
  item: ScheduleItem;
  isActive: boolean;
  onSkip: () => void;
}

export default function ScheduleStep({ item, isActive, onSkip }: ScheduleStepProps) { 
  const [isComplete, setIsComplete] = useState(false);

  const expiryTimestamp = useMemo(() => {
    const time = new Date();
    const [ hours, minutes] = (item.duration).split(':');
    const seconds = (hours * 60 * 60) + (minutes * 60);
    return time.setSeconds(time.getSeconds() + seconds);
  }, [item])

  const { seconds, minutes, hours, isRunning, start, pause, resume } = useTimer({
    expiryTimestamp, 
    autoStart: false, 
    onExpire: () => {
      setIsComplete(true);
      new Notification(`${item.name} complete!`);
    }
  })

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
          ( isComplete
            ? <button onClick={onSkip}>Next</button>
            : <ScheduleStepActions isPlaying={isRunning} onStart={start} onPause={pause} onSkip={handleOnSkip} />
          )
        }
      </div>
    </div>
  )
}
