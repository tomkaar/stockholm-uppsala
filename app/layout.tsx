import "@/styles/globals.css"
import "@/init/dayjs"

interface IRootLayout {
  children: React.ReactNode
}

const RootLayout = ({ children }: IRootLayout) => (
  <html lang="sv">
    <link rel="manifest" href="/manifest.json" />

    <body className="bg-white dark:bg-slate-900">{children}</body>
  </html>
)

export default RootLayout
