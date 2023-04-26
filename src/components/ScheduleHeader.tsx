import { useState, useContext } from 'react';
import { EditContext } from '@/context/edit';
import { EditContextType } from '@/types/edit-context';
import NotificationToggle from "./NotificationToggle";
import ScheduleMenu from './ScheduleMenu';
import { X, Edit, MoreVertical } from 'react-feather';

interface ScheduleHeaderProps {
  isNotificationsEnabled: boolean;
  setIsNotificationsEnabled: (value: boolean) => void;
}

export default function ScheduleHeader({ isNotificationsEnabled, setIsNotificationsEnabled }: ScheduleHeaderProps) {
  const { toggleEditMode, isEditModeActive } = useContext(EditContext) as EditContextType;

  return (
    <div className="pt-8 sm:pt-10 pb-5 px-1 flex justify-between border-b border-notecard-pink">
      <h1 className="text-2xl">doughnt forget</h1>
      <div className="flex relative">
        <button className="mr-4" aria-label="Toggle edit mode" onClick={toggleEditMode}>
          { isEditModeActive
              ? <><span className="visually-hidden">Disable edit mode</span><X size={26} /></>
              : <><span className="visually-hidden">Enable edit mode</span><Edit size={22} /></>
          }
        </button>
        <div className="mr-4 flex">
          <NotificationToggle isNotificationsEnabled={isNotificationsEnabled} setIsNotificationsEnabled={setIsNotificationsEnabled}  />
        </div>
        {/* <ScheduleMenu /> */}
      </div>
    </div>
  )
}
