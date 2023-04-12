export interface EditContextType {
  activeEditStep: number;
  updateActiveEditStep: (newStepId: number) => void;
  isEditModeActive: boolean;
  toggleEditMode: () => void;
}
