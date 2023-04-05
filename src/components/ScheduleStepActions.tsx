import { Play, Pause, Check } from 'iconoir-react';

interface ScheduleStepActions {
  isPlaying: boolean;
  onStart: () => void;
  onPause: () => void;
  onSkip: () => void;
}

export default function ScheduleStepActions({ isPlaying, onStart, onPause, onSkip }: ScheduleStepActions) {
  return (
    <>
      { !isPlaying && <button className="mr-1" aria-label="Start" onClick={onStart}><Play /></button> }
      { isPlaying && <button className="mr-1" aria-label="Pause" onClick={onPause}><Pause /></button> }
      <button className="mr-1" aria-label="Complete step" onClick={onSkip}><Check /></button>
    </>
  )
}
