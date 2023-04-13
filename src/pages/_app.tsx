import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { EditProvider } from '../context/edit'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <EditProvider>
      <Component {...pageProps} />
    </EditProvider>
  )
}
