import { Children } from 'react';

interface StepContainerProps {
  isActive: boolean;
  isComplete: boolean;
  isEditModeActive: boolean;
  children: React.ReactNode;
}

export default function StepContainer({ isActive, isComplete, isEditModeActive, children }: StepContainerProps) {
  return (
    <div className={`p-4 relative flex justify-between border border-x-transparent border-t-transparent not-last:border-b-blue-300
      ${ !isActive && !isEditModeActive && 'text-gray-500' }
      ${ isComplete && 'before:block before:absolute before:top-2/4 before:border-b before:w-9/12 before:border-gray-800' }
      ${ isEditModeActive && 'hover:rounded hover:shadow-lg hover:border-gray-200 hover:not-last:border-gray-200 hover:cursor-pointer' }
    `}>
      { children }
    </div>
  )
}
