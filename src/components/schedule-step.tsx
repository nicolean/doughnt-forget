import { ScheduleItem } from "../interfaces/schedule.interface"
import { Play, Pause, SkipNext } from "iconoir-react";
import { useEffect } from 'react';

interface ScheduleStepProps {
  item: ScheduleItem;
  onStart: () => void;
  onPause: () => void;
  onSkip: () => void;
}

export default function ScheduleStep({ item, onStart, onPause, onSkip }: ScheduleStepProps) { 
  return (
    <div className="py-4 flex justify-between not-last:border-b">
      <div className="basis-6/12">{ item.name }</div>
      <div className="basis-2/12">{ item.duration }</div>
      <div className="basis-2/12 flex justify-end">
        <button className="mr-1" aria-label="Start" onClick={onStart}><Play /></button>
        <button className="mr-1" aria-label="Pause" onClick={onPause}><Pause /></button>
        <button className="mr-1" aria-label="Skip" onClick={onSkip}><SkipNext /></button>
      </div>
    </div>
  )
}
