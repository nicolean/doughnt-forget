import { useState, ChangeEvent } from 'react';
import { Cancel, SaveFloppyDisk } from 'iconoir-react';
import { ScheduleStep } from '@/interfaces/schedule.interface';
import Input from './Input';

interface StepFormProps {
  step: ScheduleStep;
  onSave: (newStepData: ScheduleStep) => void;
  onCancel: () => void;
}

export default function StepForm({ step, onSave, onCancel }: StepFormProps) {
  const [name, setName] = useState(step.name);
  const [duration, setDuration] = useState(step.duration);

  const handleOnSubmit = () => {
    const newStepData = { ...step, name: name, duration: duration };
    onSave(newStepData);
  }

  return (
    <div className="grid grid-cols-12 p-4 rounded bg-white hover:bg-white shadow-lg border-gray-200 border">
      <div className="col-span-7 pr-3">
        <label className="visually-hidden" htmlFor="name">Name</label>
        <Input placeholder="Name" value={ name } onChange={(event: ChangeEvent<HTMLInputElement>) => setName(event.target.value)} id="name" />
      </div>
      <div className="col-span-3 pr-3">
        <label className="visually-hidden" htmlFor="duration">Duration</label>
        <Input placeholder="HH:MM" value={ duration } onChange={(event: ChangeEvent<HTMLInputElement>) => setDuration(event.target.value)} id="duration" />
      </div>
      <div className="col-span-2 flex justify-end">
        <button aria-label="Save changes" onClick={handleOnSubmit}><SaveFloppyDisk /></button>
        <button aria-label="Cancel changes" onClick={onCancel}><Cancel /></button>
      </div>
    </div>
  )
}
