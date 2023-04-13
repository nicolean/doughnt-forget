export interface EditContextType {
  activeEditStepId: string;
  updateActiveEditStep: (newStepId: string) => void;
  isEditModeActive: boolean;
  toggleEditMode: () => void;
  isAddStepActive: boolean;
  setIsAddStepActive: (value: boolean) => void;
}
