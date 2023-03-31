import Head from 'next/head'
// import styles from '@/styles/Home.module.css'
import Schedule from '@/components/schedule';
import Button from '@/components/button';

export default function Home() {
  return (
    <>
      <Head>
        <title>doughnt forget</title>
        <meta name="description" content="A scheduler for your bread dough" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="max-w-xl mx-auto">
        <div className="py-10">
          <h1 className="text-2xl">doughnt forget</h1>
        </div>
        <div>
          <div className="my-5">
            <Button text="Start!" />
          </div>
          <Schedule />
        </div>
      </main>
    </>
  )
}
