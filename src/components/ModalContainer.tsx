import { useRef } from 'react';
import useOnClickOutside from '@/hooks/useOutsideClickAlert';
import Button from '@components/Button';
import { X } from 'react-feather';

interface ModalContainerProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  title: string;
  children: React.ReactNode;
  showCancel?: boolean;
  onCtaClick?: () => void;
  ctaText?: string;
}

export default function ModalContainer({ isOpen, setIsOpen, title, children, showCancel, onCtaClick, ctaText }: ModalContainerProps) {
  const wrapperRef = useRef(null);
  useOnClickOutside(wrapperRef, () => setIsOpen(false));

  return (
    isOpen ?
      <div className="fixed top-0 left-0 w-screen h-screen sm:p-10 bg-gray-900/50 z-10">
        <div ref={wrapperRef} className="absolute flex flex-col sm:block sm:left-2/4 sm:-translate-x-2/4 rounded shadow bg-white w-screen sm:w-9/12 lg:w-6/12 xl:w-4/12 h-screen sm:max-h-full sm:h-auto">
          <div className="flex justify-between p-6">
            <h2 className="text-xl">{ title }</h2>
            <button aria-label="Close modal" onClick={() => setIsOpen(false)}><X /></button>
          </div>
          <div className="overflow-y-scroll h-full sm:h-auto px-6">
            {children}
          </div>
          { (showCancel || onCtaClick) &&
            <div className="flex justify-end p-6">
              <Button ariaLabel="Cancel" classes="ml-5" onClick={() => setIsOpen(false)}>Cancel</Button>
              { onCtaClick && <Button ariaLabel="Save" classes="ml-5 bg-blue-300" onClick={onCtaClick}>{ ctaText }</Button> }
            </div>
          }
        </div>
      </div>
    : null
  )
}
