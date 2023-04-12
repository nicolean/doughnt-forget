interface InputProps {
  id: string;
  placeholder: string;
  value?: string;
  onChange: () => void;
}

export default function Input({ id, placeholder, value, onChange }: InputProps) {
  return <input id={id} placeholder={placeholder} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={value}
            onChange={onChange} />
}
