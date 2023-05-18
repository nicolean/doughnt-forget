import { useState, ChangeEvent } from 'react';
import { X, Save, Trash, Trash2 } from 'react-feather';
import { ScheduleStep, StepFormData } from '@/types/schedule';
import { useForm } from 'react-hook-form';
import Button from './Button';


interface StepFormProps {
  step: ScheduleStep;
  onSubmit: (newStepData: ScheduleStep) => void;
  onCancel: () => void;
  onDeleteStep?: (stepId: string) => void;
}

export default function StepForm({ step, onSubmit, onCancel, onDeleteStep }: StepFormProps) {
  const { register, handleSubmit, reset, formState: { errors }} = useForm({
    defaultValues: {
      name: step.name,
      duration: step.duration
    }
  });

  const handleOnSubmit = (data: StepFormData) => {
    const newStepData = { ...step, ...data };
    onSubmit(newStepData);
    reset({ name: '', duration: '' });
  }

  return (
    <div className="grid grid-cols-12 p-4 rounded bg-white hover:bg-white shadow-lg border-gray-200 border">
      <div className="relative col-span-8 sm:col-span-7 pr-3">
        <label className="visually-hidden" htmlFor="name">Name</label>
        <input id="name" placeholder="Name*" className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.name && 'border-red-600'}`}
          {...register('name', { required: true })}  aria-invalid={errors.name ? 'true' : 'false'} />
          { errors.name?.type === 'required' && <p className="absolute bg-white text-xs text-red-600 p-1 -top-3 left-1">Required</p> }
      </div>
      <div className="relative col-span-4 sm:col-span-3 sm:pr-3">
        <label className="visually-hidden" htmlFor="duration">Duration</label>
        <input id="duration" placeholder="HH:MM" className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.duration && 'border-red-600'}`}
          {...register('duration', { pattern: /^([0-9][0-9]):([0-5][0-9])/i })} aria-invalid={errors.duration ? 'true' : 'false'} />
          { errors.duration?.type === 'pattern' && <p className="absolute bg-white text-xs text-red-600 p-1 -top-3 left-1">HH:MM</p> }
      </div>
      <div className="col-span-12 flex sm:col-span-2 mt-4 sm:mt-0">
        <div className="sm:hidden flex justify-between w-full">
          { onDeleteStep && step.id &&
            <Button ariaLabel="Delete step" classes="bg-white border border-red-800 text-red-800" onClick={() => onDeleteStep(step.id)}>Delete</Button>
          }
          <div className="flex">
            <Button ariaLabel="Cancel changes" classes="bg-white border border-slate-300" onClick={onCancel}>Cancel</Button>
            <Button ariaLabel="Save changes" classes="ml-2" onClick={handleSubmit(handleOnSubmit)}>Save</Button>
          </div>
        </div>
        <div className="hidden sm:flex justify-end w-full">
          <button aria-label="Save changes" onClick={handleSubmit(handleOnSubmit)}><Save /></button>
          <button aria-label="Cancel changes" onClick={onCancel}><X size={28} /></button>
          { onDeleteStep && step.id &&
            <button aria-label="Delete step" onClick={() => onDeleteStep(step.id)}><Trash2 /></button>
          }
        </div>
      </div>
    </div>
  )
}
