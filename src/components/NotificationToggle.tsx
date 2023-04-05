import { useEffect, useState } from 'react';
import { Bell, BellOff } from 'iconoir-react';

interface NotificationToggleProps {
  isNotificationsEnabled: boolean;
  setIsNotificationsEnabled: () => void;
}

export default function NotificationToggle({ isNotificationsEnabled, setIsNotificationsEnabled }: NotificationToggleProps) {
  const [isNotificationsSupported, setIsNotificationsSupported] = useState(false);
  const [isDesktopNotificationsAllowed, setIsDesktopNotificationsAllowed] = useState(false);

  useEffect(() => {
    if (!('Notification' in window)) {
      console.log("This browser does not support notifications.");
      return;
    }

    setIsNotificationsSupported(true);
    if (Notification.permission === 'granted') {
      setIsDesktopNotificationsAllowed(true);
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
      setIsDesktopNotificationsAllowed(result);
    });
  }

  const onButtonClick = () => {
    requestNotificationPermission();
    setIsNotificationsEnabled((isNotificationsEnabled) => !isNotificationsEnabled);
  }

  return (
    isNotificationsSupported &&
      <div className="group flex content-center relative">
        <button onClick={onButtonClick} aria-label="Toggle notifications">
          { isDesktopNotificationsAllowed && isNotificationsEnabled
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
        { // TODO decide if this should remain
          !isDesktopNotificationsAllowed && <div className="hidden group-hover:block absolute text-xs bg-slate-700 text-white py-1 px-2 rounded top-12 whitespace-nowrap left-2/4 -translate-y-2/4 -translate-x-2/4">Allow browser notifications to enable</div>
        }
      </div>
  )
}
