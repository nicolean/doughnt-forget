import Head from 'next/head'
import { useState, useContext } from 'react';
import { EditContext } from '@/context/edit';
import { EditContextType } from '@/types/edit-context';
import Schedule from '@/components/Schedule';
import ScheduleHeader from '../components/ScheduleHeader';
import NotificationToggle from '@/components/NotificationToggle';
import { X, Edit } from 'react-feather';

export default function Home() {
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState<boolean>(false);

  const { toggleEditMode, isEditModeActive } = useContext(EditContext) as EditContextType;

  return (
    <>
      <Head>
        <title>doughnt forget</title>
        <meta name="description" content="A scheduler for your bread dough" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
		    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </Head>
      <main className="w-screen">
        <div className="w-full px-5 sm:max-w-xl sm:p-0 mx-auto">
          <ScheduleHeader isNotificationsEnabled={isNotificationsEnabled} setIsNotificationsEnabled={setIsNotificationsEnabled} />
          <div>
            <Schedule isNotificationsEnabled={isNotificationsEnabled} />
          </div>
        </div>
      </main>
    </>
  )
}
