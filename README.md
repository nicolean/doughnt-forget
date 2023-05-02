# 🥖 doughnt forget
Never forget your dough again!

doughnt forget is a simple web app for building and executing a step-by-step dough timeline.

## Features
### Editing the Timeline
- Each step has an editable name and duration
- Steps can be edited, reordered, or deleted
- Timeline JSON data can be exported/imported to/from a `.txt` file (WIP)
### Executing the Timeline
- Total "play" duration is tracked
- Start, pause, and skip steps
- Steps with a defined duration, like a rest or bulk fermentation, have a timer to track time
- Steps without a defined duration, like mixing in salt or shaping, will have a stopwatch to track time
- Browser notifications when a timed step is complete
### Future
- Option to "continue" a completed step (dough can be unpredictable!)
- Notification list with history of timestamped notifications
- Timeline history/stats?

## Running Locally

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

### Basic Development Server

To run the basic development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### HTTPS-enabled Development Server

Desktop notifications are [only available in secure contexts](https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API/Using_the_Notifications_API). The [local-ssl-proxy](https://github.com/cameronhunter/local-ssl-proxy) library is used to enable https for local development.

First, [create a self-signed trusted certificate for localhost](https://github.com/cameronhunter/local-ssl-proxy#run-ssl-proxy-with-a-self-signed-trusted-certificate).

Then to run the local development server with https enabled:

```bash
npm run dev-https
```

Open [http://localhost:3001](http://localhost:3001) with your browser to see the result.
