import { Metadata } from "next"

import NavigateToTripButton from "@/components/NavigateToTripButton"

export const metadata: Metadata = {
  title: "Stockholm - Uppsala med Movingo",
  description: "Trains that run between Stockholm and Uppsala",
  viewport: "width=device-width, initial-scale=1",
}

export default function Home() {
  return (
    <main className="flex flex-row justify-center pt-12">
      <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-8">
        <h2 className="text-center text-base text-slate-900 font-semibold dark:text-white pb-2">Var vill du resa?</h2>
        <p className="text-center text-sm text-slate-900 dark:text-slate-300 pb-8">
          Resor mellan Stockholm och
          <br /> Uppsala där Movingo gäller.
        </p>

        <NavigateToTripButton from="Stockholm" to="Uppsala" />
        <span className="block text-center text-sm text-slate-900 dark:text-slate-300 my-2">eller</span>
        <NavigateToTripButton from="Uppsala" to="Stockholm" />
      </div>
    </main>
  )
}
