import { Children } from 'react';

interface StepContainerProps {
  isActive: boolean;
  isComplete: boolean;
  children: React.ReactNode;
}

export default function StepContainer({ isActive, isComplete, children }: StepContainerProps) {
  return (
    <div className={`p-4 relative flex justify-between not-last:border-b not-last:border-blue-300
      ${ !isActive ? 'text-gray-500' : null }
      ${ isComplete ? 'before:block before:absolute before:top-2/4 before:border-b before:w-9/12 before:border-gray-800' : null}
    `}>
      { isComplete }
      { children }
    </div>
  )
}
