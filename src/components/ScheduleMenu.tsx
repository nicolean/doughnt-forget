import { useState, useEffect, useContext, useRef } from 'react';
import useOutsideClickAlert from '@/hooks/useOutsideClickAlert';
import { MoreVertical, Download, Upload } from 'react-feather';
import { ScheduleContext } from '@/context/schedule';
import { ScheduleContextType } from '@/types/schedule';

export default function ScheduleMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [scheduleDownloadData, setScheduleDownloadData] = useState<string>('');

  const { schedule } = useContext(ScheduleContext) as ScheduleContextType;

  const wrapperRef = useRef(null);
  useOutsideClickAlert(wrapperRef, () => setIsMenuOpen(false));

  useEffect(() => {
    setScheduleDownloadData(
      `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(schedule))}`
    );
  }, [schedule])

  const onImport = () => {}

  return (
    <div ref={wrapperRef} className="relative flex items-center">
      <button onClick={() => setIsMenuOpen((isMenuOpen) => !isMenuOpen)}><MoreVertical /></button>
      <div className={`absolute top-10 right-0 ${!isMenuOpen && 'hidden'} rounded shadow-md bg-white border border-gray-100 z-20 text-sm w-28`}>
        <ul className="list-none">
          <li className="cursor-pointer not-last:border-b border-gray-200 hover:bg-gray-100">
            <a className="w-full p-4 text-center" type="button" href={scheduleDownloadData} download="dough-schedule.json">
              Export
            </a>
          </li>
          <li className="p-4 cursor-pointer not-last:border-b border-gray-200 hover:bg-gray-100">
            <button className="w-full">
              Import
            </button>
          </li>
        </ul>
      </div>
    </div>
  )
}
