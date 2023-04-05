import TimedScheduleStep from "./TimedScheduleStep";
import UntimedScheduleStep from "./UntimedScheduleStep";
import { useState } from "react";
import { defaultSchedule } from '../data/default-schedule';
import { ScheduleItem } from "@/interfaces/schedule.interface";

export default function Schedule() {
  const [schedule, setSchedule] = useState([...defaultSchedule]);
  const [activeStep, setActiveStep] = useState(1);
  const [isComplete, setIsComplete] = useState(false);

  const removeItem = (removedItem: ScheduleItem) => {
    let filteredSchedule = [...schedule].filter(item => item !== removedItem);
    setSchedule(filteredSchedule);
  }

  const onSkip = (item: ScheduleItem) => {
    // TODO handle total addition duration here in the future
    setActiveStep(activeStep + 1);
    if (activeStep === schedule.length) {
      setIsComplete(true);
    }
  }

  return (
    <div>
      {schedule.map(item => {
        if (item.duration) {
          return <TimedScheduleStep key={item.stepNumber} item={item} isActive={activeStep === item.stepNumber} onSkip={() => onSkip(item)} />
        } else {
          return <UntimedScheduleStep key={item.stepNumber} item={item} isActive={activeStep === item.stepNumber} onSkip={() => onSkip(item)} />
        }
      })}
      { isComplete &&
        <div className="text-center py-5">COMPLETE!</div>
      }
    </div>
  )
}
