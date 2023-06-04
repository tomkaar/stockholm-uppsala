import "@/styles/globals.css"
import "@/init/dayjs"

import { Metadata } from "next"

import { Header } from "./[from]/[to]/[day]/components/Header"

interface IRootLayout {
  children: React.ReactNode
}

export const metadata: Metadata = {
  title: "Stockholm - Uppsala med Movingo",
  description: "Trains that run between Stockholm and Uppsala",
  viewport: "width=device-width, initial-scale=1",
}

const RootLayout = ({ children }: IRootLayout) => (
  <html lang="sv">
    <link rel="manifest" href="/manifest.json" />

    <body className="bg-white dark:bg-slate-900">
      <Header />

      {children}
    </body>
  </html>
)

export default RootLayout
