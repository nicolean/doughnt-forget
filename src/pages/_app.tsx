import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { EditProvider } from '@/context/edit'
import { ScheduleProvider } from '@/context/schedule'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <EditProvider>
      <ScheduleProvider>
        <Component {...pageProps} />
      </ScheduleProvider>
    </EditProvider>
  )
}
