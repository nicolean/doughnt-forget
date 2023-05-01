import { useContext } from 'react';
import { ScheduleContext } from '@/context/schedule';
import { ScheduleContextType } from '@/types/schedule';
import ModalContainer from '@/components/ModalContainer';
import { ScheduleStep } from '@/types/schedule';

interface SchedulePreviewModalProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  schedule: ScheduleStep[];
}

export default function SchedulePreviewModal({ isOpen, setIsOpen, schedule }: SchedulePreviewModalProps) {
  const { setSchedule } = useContext(ScheduleContext) as ScheduleContextType;

  const onImport = () => {
    setSchedule(schedule);
    setIsOpen(false);
  }

  return (
    <ModalContainer isOpen={isOpen} setIsOpen={setIsOpen} showCancel={true} onCtaClick={onImport} ctaText="Import">
      <div>
        { schedule.map(s => {
            return (
              <div key={s.id} className="relative bg-white not-first:border-t not-first:border-t-blue-300">
                <div className="grid grid-cols-12 py-4 px-2 sm:px-4">
                  <div className="col-span-6 sm:col-span-7">{ s.name }</div>
                  <div className="col-span-4 sm:col-span-3">{ s.duration }</div>
                </div>
              </div>
            )}
          )
        }
      </div>
    </ModalContainer>
  )
}
