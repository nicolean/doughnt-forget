import { useEffect, useState } from 'react';
import { Bell, BellOff } from 'react-feather';

interface NotificationToggleProps {
  isNotificationsEnabled: boolean;
  setIsNotificationsEnabled: (value: boolean) => void;
}

export default function NotificationToggle({ isNotificationsEnabled, setIsNotificationsEnabled }: NotificationToggleProps) {
  const [isNotificationsSupported, setIsNotificationsSupported] = useState<boolean>(false);
  const [isNotificationsAllowed, setIsNotificationsAllowed] = useState<boolean>(false);
  const [isTooltipShown, setIsTooltipShown] = useState<boolean>(false);

  useEffect(() => {
    if (!('Notification' in window)) {
      console.log("This browser does not support notifications.");
      return;
    }

    setIsNotificationsSupported(true);
    if (Notification.permission === 'granted') {
      setIsNotificationsAllowed(true);
      setIsNotificationsEnabled(true);
    }
  }, [setIsNotificationsEnabled])

  const requestNotificationPermission = () => {
    // Only request notification permission if not yet explicitly set
    if (Notification.permission !== 'default') {
      return;
    }

    Notification.requestPermission().then((permission) => {
      const result = Notification.permission === 'granted' ? true : false;
      setIsNotificationsAllowed(result);
      if (result) {
        setIsNotificationsEnabled(true);
      }
    });
  }

  const onButtonClick = () => {
    if (Notification.permission === 'denied') {
      setIsTooltipShown(true);
      setTimeout(() => { setIsTooltipShown(false) }, 2500);
      return;
    }

    requestNotificationPermission();
    setIsNotificationsEnabled(!isNotificationsEnabled);
  }

  return (
    isNotificationsSupported ?
      <div className="group flex content-center relative">
        <button onClick={onButtonClick} aria-label="Toggle notifications">
          { isNotificationsAllowed && isNotificationsEnabled
            ? <>
                <Bell />
                <span className="visually-hidden">Notifications are enabled</span>
              </>
            : <>
                <BellOff />
                <span className="visually-hidden">Notifications are disabled</span>
              </>
            }
        </button>
        { isTooltipShown &&
          <div className="absolute top-12 left-2/4 -translate-y-2/4 -translate-x-2/4 bg-slate-700 py-1 px-2 rounded text-xs text-white whitespace-nowrap z-20">Allow browser notifications to enable</div>
        }
      </div>
    : null
  )
}
