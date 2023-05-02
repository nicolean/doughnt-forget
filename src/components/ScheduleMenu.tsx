import { useState, useEffect, useContext, useRef } from 'react';
import useOutsideClickAlert from '@/hooks/useOutsideClickAlert';
import { MoreVertical } from 'react-feather';
import { ScheduleContext } from '@/context/schedule';
import { ScheduleContextType, ScheduleStep } from '@/types/schedule';
import SchedulePreviewModal from './SchedulePreviewModal';

export default function ScheduleMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [scheduleDownloadData, setScheduleDownloadData] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [parsedDownloadData, setParsedDownloadData] = useState<ScheduleStep[] | null>(null);

  const { schedule } = useContext(ScheduleContext) as ScheduleContextType;

  const fileInputRef = useRef<HTMLInputElement>(null);

  const wrapperRef = useRef(null);
  useOutsideClickAlert(wrapperRef, () => setIsMenuOpen(false));

  useEffect(() => {
    setScheduleDownloadData(
      `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(schedule))}`
    );
  }, [schedule])

  const onUploadSchedule = (e: any) => {
    let file = e.target.files[0];
    console.log(file);

    if (file) {
      const reader = new FileReader();
      reader.readAsText(file);

      reader.onload = () => {
        if (!reader.result || typeof reader.result !== 'string') {
          // TODO error handling here--alert? toast?
          return;
        }

        handleFileData(reader.result);
      };

      reader.onerror = () => {
        // TODO error handling here--alert? toast?
        console.log(reader.error);
      };
    }
  }

  const handleFileData = (data: string) => {
    try {
      const jsonData = JSON.parse(data);

      // TODO validate data

      setParsedDownloadData(jsonData);
      setIsMenuOpen(false);
      setIsModalOpen(true);

      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (e) {
      alert('Cannot import from file')
      return false;
    }
  }

  return (
    <>
      <div ref={wrapperRef} className="relative flex items-center">
        <button onClick={() => setIsMenuOpen((isMenuOpen) => !isMenuOpen)}><MoreVertical /></button>
        <div className={`absolute top-10 right-0 ${!isMenuOpen && 'hidden'} rounded shadow-md bg-white border border-gray-100 z-20 text-sm w-28`}>
          <ul className="list-none">
            <li className="cursor-pointer not-last:border-b border-gray-200 hover:bg-gray-100">
              <a className="w-full p-4 text-center" type="button" href={scheduleDownloadData} download="dough-schedule.txt">
                Export
              </a>
            </li>
            <li className="cursor-pointer not-last:border-b border-gray-200 hover:bg-gray-100">
              <label className="cursor-pointer w-full p-4 inline-block text-center">
                <input ref={fileInputRef} className="hidden" type="file" accept=".txt" name="imported-schedule" onChange={onUploadSchedule} />
                Upload
              </label>
            </li>
          </ul>
        </div>
      </div>
      { parsedDownloadData && <SchedulePreviewModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} schedule={parsedDownloadData} /> }
    </>
  )
}
