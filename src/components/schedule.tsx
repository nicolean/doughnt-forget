import InputRow from "./input-row";
import { useState } from "react";
import { defaultSchedule } from '../data/default-schedule';
import { ScheduleItem } from "@/interfaces/schedule.interface";

export default function Schedule() {
  const [schedule, setSchedule] = useState([...defaultSchedule]);

  const removeItem = (removedItem: ScheduleItem) => {
    let filteredSchedule = [...schedule].filter(item => item !== removedItem);
    setSchedule(filteredSchedule);
  }

  return (
    <div>
      {schedule.map((item, index) => {
        return <InputRow key={index} item={item} onDelete={() => removeItem(item)} />
      })}
    </div>
  )
}
