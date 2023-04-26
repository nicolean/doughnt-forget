import { Play, Pause, Check } from 'react-feather';

interface StepActions {
  isPlaying: boolean;
  onStart: () => void;
  onPause: () => void;
  onSkip: () => void;
}

export default function StepActions({ isPlaying, onStart, onPause, onSkip }: StepActions) {
  return (
    <>
      { isPlaying
        ? <button className="mr-1" aria-label="Pause" onClick={onPause}><Pause /></button>
        : <button className="mr-1" aria-label="Start" onClick={onStart}><Play /></button>
      }
      <button className="mr-1" aria-label="Complete step" onClick={onSkip}><Check /></button>
    </>
  )
}
