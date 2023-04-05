interface ButtonProps {
  type?: string;
  text: string;
}

export default function Button({ type, text }: ButtonProps) {
  return(
    <button className="w-full bg-slate-200 hover:bg-slate-400 py-2 px-4 rounded">{text}</button>
  )
}
