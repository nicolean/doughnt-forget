import { createContext, useState, useEffect } from 'react';
import { EditContextType } from '@/types/edit-context';

interface EditProviderProps {
  children: React.ReactNode;
}

const EditContext = createContext<EditContextType | null>(null);

function EditProvider({ children }: EditProviderProps) {
  const [isEditModeActive, setIsEditModeActive] = useState<boolean>(false);
  const [activeEditStepId, setActiveEditStepId] = useState<string>('');

  const value = {
    activeEditStepId: activeEditStepId,
    updateActiveEditStep: (newStepId: number) => {
      setActiveEditStepId(newStepId);
    },
    isEditModeActive: isEditModeActive,
    toggleEditMode: () => {
      setActiveEditStepId('');
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
