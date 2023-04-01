import { Cancel, MoreVert } from "iconoir-react";
import { ScheduleItem } from "@/interfaces/schedule.interface";

interface InputRowProps {
  item: ScheduleItem;
  onDelete: () => void;
}

export default function InputRow({ item, onDelete }: InputRowProps) {
  return (
    <div className="py-2 flex justify-between">
      <div className="flex items-center">
        <span className="hover:cursor-grab">
          <MoreVert />
        </span>
      </div>
      <div className="w-full mx-2">
        <label>Name</label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Name" value={item.name} />
      </div>
      <div className="w-full mx-2 basis-1/3">
        <label>Type</label>
        <div className="relative">
          <select className="shadow appearance-none border rounded w-full py-2 px-4 pr-8 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            <option selected={item.type === 'Action'} value="Action">Action</option>
            <option selected={item.type === 'Rest'} value="Rest">Rest</option>
          </select>
          {/* Select arrow */}
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
          </div>
        </div>
      </div>
      <div className="w-full mx-2">
        <label>Duration</label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="HH:MM" value={item.duration} />
      </div>
      <div className="flex items-center">
        <span className="hover:cursor-pointer" onClick={onDelete}>
          <Cancel />
        </span>
      </div>
    </div>
  )
}
