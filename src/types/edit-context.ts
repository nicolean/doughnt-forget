export interface EditContextType {
  activeEditStepId: number;
  updateActiveEditStep: (newStepId: number) => void;
  isEditModeActive: boolean;
  toggleEditMode: () => void;
}
