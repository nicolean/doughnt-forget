import Head from 'next/head'
// import styles from '@/styles/Home.module.css'
import Schedule from '@/components/schedule';
import Button from '@/components/button';

export default function Home() {
  return (
    <>
      <Head>
        <title>Bread.</title>
        <meta name="description" content="A scheduler for your bread" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="max-w-5xl mx-auto">
        <div className="py-10">
          <h1 className="text-2xl">bread.</h1>
        </div>
        <div>
          <Schedule />
          <div className="my-5">
            <Button text="Start!" />
          </div>
        </div>
      </main>
    </>
  )
}
