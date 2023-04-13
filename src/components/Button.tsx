interface ButtonProps {
  ariaLabel: string;
  children: React.ReactNode;
  onClick: () => void;
}

export default function Button({ ariaLabel, children, onClick }: ButtonProps) {
  return(
    <button aria-label={ariaLabel} onClick={onClick} className="flex justify-center w-full rounded bg-slate-200 hover:bg-slate-400 py-2 px-4">{ children }</button>
  )
}
