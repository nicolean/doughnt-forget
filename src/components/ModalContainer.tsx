import { useRef } from 'react';
import useOnClickOutside from '@/hooks/useOutsideClickAlert';
import Button from '@components/Button';
import { X } from 'react-feather';

interface ModalContainerProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  children: React.ReactNode;
  showCancel?: boolean;
  onCtaClick?: () => void;
  ctaText?: string;
}

export default function ModalContainer({ isOpen, setIsOpen, children, showCancel, onCtaClick, ctaText }: ModalContainerProps) {
  const wrapperRef = useRef(null);
  useOnClickOutside(wrapperRef, () => setIsOpen(false));

  return (
    isOpen ?
      <div className="fixed top-0 left-0 w-full h-full z-10 bg-gray-900/50">
        <div ref={wrapperRef} className="absolute top-36 left-2/4 -translate-x-2/4 rounded shadow bg-white p-4 w-8/12">
          <div className="text-right">
            <button onClick={() => setIsOpen(false)}><X /></button>
          </div>
          <div>{children}</div>
          { (showCancel || onCtaClick) &&
            <div>
              <Button ariaLabel="Cancel" onClick={() => setIsOpen(false)}>Cancel</Button>
              { onCtaClick && <Button ariaLabel="Save" onClick={onCtaClick}>{ ctaText }</Button> }
            </div>
          }
        </div>
      </div>
      :
      null
  )
}
