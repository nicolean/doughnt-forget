interface ButtonProps {
  ariaLabel: string;
  isFullWidth?: boolean;
  classes?: string;
  children: React.ReactNode;
  onClick: () => void;
}

export default function Button({ ariaLabel, isFullWidth, classes, children, onClick }: ButtonProps) {
  return(
    <button aria-label={ariaLabel} onClick={onClick} className={`flex justify-center rounded bg-slate-200 hover:bg-slate-400 py-1 sm:py-2 px-2 sm:px-4 ${ isFullWidth && 'w-full' } ${ classes }`}>
      { children }
    </button>
  )
}
