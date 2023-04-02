import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <link rel="manifest" href="manifest.json" />

      <body className='bg-white dark:bg-slate-900'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
