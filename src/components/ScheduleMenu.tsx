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

  const onImportSchedule = (e: any) => {
    const file = e.target.files[0];

    if (!file) {
      handleImportError('File is missing and cannot be imported.');
      return;
    }

    const reader = new FileReader();
    reader.readAsText(file);

    reader.onload = () => {
      if (!reader.result || typeof reader.result !== 'string') {
        handleImportError();
        return;
      }

      handleFileData(reader.result);
    };

    reader.onerror = () => {
      handleImportError();
      console.log(reader.error);
    };
  }

  const handleFileData = (data: string) => {
    try {
      const jsonData = JSON.parse(data);
    } catch (e) {
      setIsMenuOpen(false);
      handleImportError('Data is not correctly formatted and cannot be imported.');
      return false;
    }

    if (!validateImportedFileData(jsonData)) {
      handleImportError('Data is not correctly formatted and cannot be imported.');
      return;
    }

    setParsedDownloadData(jsonData);
    setIsMenuOpen(false);
    setIsModalOpen(true);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }

  const handleImportError = (message?: string) => {
    alert('This file cannot be imported.' || message);
  }

  const validateImportedFileData = (data: any) => {
    if (!Array.isArray(data)) {
      return false;
    }

    const scheduleKeys = ['id', 'name', 'type', 'duration', 'actualDuration', 'isCompleted'];
    return data.every(i => scheduleKeys.every(key => Object.keys(i).includes(key)))
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
                <input ref={fileInputRef} className="hidden" type="file" accept=".txt" name="imported-schedule" onChange={onImportSchedule} />
                Import
              </label>
            </li>
          </ul>
        </div>
      </div>
      { parsedDownloadData && <SchedulePreviewModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} schedule={parsedDownloadData} /> }
    </>
  )
}
