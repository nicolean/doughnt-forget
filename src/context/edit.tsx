import { createContext, useState, useEffect } from 'react';
import { EditContextType } from '@/types/edit-context';

interface EditProviderProps {
  children: React.ReactNode;
}

const EditContext = createContext<EditContextType | null>(null);

function EditProvider({ children }: EditProviderProps) {
  const [isEditModeActive, setIsEditModeActive] = useState<boolean>(false);
  const [activeEditStep, setActiveEditStep] = useState<number>(-1);

  const value = {
    activeEditStep: activeEditStep,
    updateActiveEditStep: (newStepId: number) => {
      setActiveEditStep(newStepId);
    },
    isEditModeActive: isEditModeActive,
    toggleEditMode: () => {
      setActiveEditStep(-1);
      setIsEditModeActive((isEditModeActive) => !isEditModeActive);
    }
  }

  return (
    <EditContext.Provider value={value}>
      { children }
    </EditContext.Provider>
  )
}

export { EditContext, EditProvider };
