import { Cancel, SaveFloppyDisk } from 'iconoir-react';
import { ScheduleStep } from '@/interfaces/schedule.interface';

interface StepFormProps {
  step: ScheduleStep;
  onSave: () => void;
  onCancel: () => void;
}

export default function StepForm({ step, onSave, onCancel }: StepFormProps) {
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-7 pr-3">
        <input className="w-full border rounded border-gray-300" defaultValue={ step.name } />
      </div>
      <div className="col-span-3 pr-3">
        <input className="w-full border rounded border-gray-300" defaultValue={ step.duration } />
      </div>
      <div className="col-span-2 flex justify-end">
        <button aria-label="Save changes" onClick={onSave}><SaveFloppyDisk /></button>
        <button aria-label="Cancel changes" onClick={onCancel}><Cancel /></button>
      </div>
    </div>
  )
}
