import Head from 'next/head'
import { useState, useContext } from 'react';
import { EditContext } from '@/context/edit';
import { EditContextType } from '@/types/edit-context';
import Schedule from '@/components/Schedule';
import Button from '@/components/Button';
import NotificationToggle from '@/components/NotificationToggle';
import { Cancel, EditPencil } from 'iconoir-react';

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
        <div className="w-full px-8 sm:max-w-xl sm:p-0 mx-auto">
          <div className="pt-10 pb-5 px-1 flex justify-between border-b border-notecard-pink">
            <h1 className="text-2xl">doughnt forget</h1>
            <div className="flex">
              <button className="mr-4" aria-label="Toggle edit mode" onClick={toggleEditMode}>
                { isEditModeActive
                    ? <><span className="visually-hidden">Disable edit mode</span><Cancel /></>
                    : <><span className="visually-hidden">Enable edit mode</span><EditPencil /></>
                }
              </button>
              <NotificationToggle isNotificationsEnabled={isNotificationsEnabled} setIsNotificationsEnabled={setIsNotificationsEnabled}  />
            </div>
          </div>
          <div>
            <Schedule isNotificationsEnabled={isNotificationsEnabled} />
          </div>
        </div>
      </main>
    </>
  )
}
