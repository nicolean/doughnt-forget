import { createContext, useState } from 'react';
import { EditContextType } from '@/types/edit-context';

interface EditProviderProps {
  children: React.ReactNode;
}

const EditContext = createContext<EditContextType | null>(null);

function EditProvider({ children }: EditProviderProps) {
  const [isEditModeActive, setIsEditModeActive] = useState<boolean>(false);
  const [activeEditStepId, setActiveEditStepId] = useState<string>('');
  const [isAddStepActive, setIsAddStepActive] = useState<boolean>(false);

  const value = {
    activeEditStepId: activeEditStepId,
    updateActiveEditStep: (newStepId: string) => {
      if (newStepId) {
        setIsAddStepActive(false);
      }
      setActiveEditStepId(newStepId);
    },
    isEditModeActive: isEditModeActive,
    toggleEditMode: () => {
      setActiveEditStepId('');
      setIsAddStepActive(false);
      setIsEditModeActive((isEditModeActive) => !isEditModeActive);
    },
    isAddStepActive: isAddStepActive,
    setIsAddStepActive: (value: boolean) => {
      if (value) {
        setActiveEditStepId('');
      }
      setIsAddStepActive(value);
    }
  }

  return (
    <EditContext.Provider value={value}>
      { children }
    </EditContext.Provider>
  )
}

export { EditContext, EditProvider };
