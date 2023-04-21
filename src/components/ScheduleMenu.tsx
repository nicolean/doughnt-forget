import { useState } from 'react';
import { MoreVertical, Download, Upload } from 'react-feather';

export default function ScheduleMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState();

  const onExport = () => {}

  const onImport = () => {}

  return (
    <div className="relative flex items-center">
      <button onClick={() => setIsMenuOpen((isMenuOpen) => !isMenuOpen)}><MoreVertical /></button>
      <div className={`absolute top-10 right-0 opacity-0 duration-100 ease-in-out ${isMenuOpen && 'opacity-100'} rounded shadow-md bg-white border border-gray-100 z-20 text-sm w-28`}>
        <ul className="list-none">
          <li className="p-4 cursor-pointer not-last:border-b border-gray-200 hover:bg-gray-100">
            <button className="w-full">
              Export
            </button>
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