import dayjs from "dayjs"
import { Metadata } from "next"

import { ChevronRight } from "@/assets/icons/ChevronRight"
import { LinkButton } from "@/components/LinkButton"

export const metadata: Metadata = {
  title: "Stockholm - Uppsala med Movingo",
  description: "Trains that run between Stockholm and Uppsala",
  viewport: "width=device-width, initial-scale=1",
}

export const revalidate = 60

async function Home() {
  const today = await new Promise((resolve) => resolve(dayjs().format("YYYY-MM-DD")))

  return (
    <main className="flex flex-row justify-center pt-12">
      <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-8">
        <h2 className="text-center text-base text-slate-900 font-semibold dark:text-white pb-2">Var vill du resa?</h2>
        <p className="text-center text-sm text-slate-900 dark:text-slate-300 pb-8">
          Resor mellan Stockholm och
          <br /> Uppsala där Movingo gäller.
        </p>

        <LinkButton prefetch={false} href={`/Stockholm/Uppsala/${today}`}>
          <span className="font-semibold">Stockholm</span>
          &nbsp;
          <ChevronRight width="16" height="16" />
          &nbsp;
          <span className="font-semibold">Uppsala</span>
        </LinkButton>

        <span className="block text-center text-sm text-slate-900 dark:text-slate-300 my-2">eller</span>

        <LinkButton prefetch={false} href={`/Uppsala/Stockholm/${today}`}>
          <span className="font-semibold">Uppsala</span>
          &nbsp;
          <ChevronRight width="16" height="16" />
          &nbsp;
          <span className="font-semibold">Stockholm</span>
        </LinkButton>
      </div>
    </main>
  )
}

export default Home
