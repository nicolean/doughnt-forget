import ScheduleStep from "./schedule-step";
import { useState } from "react";
import { defaultSchedule } from '../data/default-schedule';
import { ScheduleItem } from "@/interfaces/schedule.interface";

export default function Schedule() {
  const [schedule, setSchedule] = useState([...defaultSchedule]);

  const removeItem = (removedItem: ScheduleItem) => {
    let filteredSchedule = [...schedule].filter(item => item !== removedItem);
    setSchedule(filteredSchedule);
  }

  const onPause = (item: ScheduleItem) => { console.log('onPause', item)}

  const onStart = (item: ScheduleItem) => { console.log('onStart', item)}

  const onSkip = (item: ScheduleItem) => { console.log('onSkip', item)}

  return (
    <div>
      {schedule.map((item, index) => {
        return <ScheduleStep key={index} item={item} onPause={() => onPause(item)} onStart={() => onStart(item)} onSkip={() => onSkip(item)} />
      })}
    </div>
  )
}
