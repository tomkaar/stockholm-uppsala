'use client'

import { HelpCircle } from "@/assets/icons/HelpCircle"
import { stationStockholm, stationUppsala } from "@/constants/stations"

import { Dialog } from '@headlessui/react'
import { useState } from "react"
import { Button } from "./Button"

export interface IFAQ {
  from?: string
  to?: string
}

export const FAQ = ({ from = stationStockholm, to = stationUppsala }: IFAQ) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button
        aria-label="Vanliga frågor"
        onClick={() => setIsOpen(true)}
        className="ml-1 text-slate-900 dark:text-white text-xl tracking-light text-center font-bold"
      >
        <HelpCircle width={20} height={20} />
      </button>

      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="fixed z-30 top-0 left-0 right-0 bottom-0 flex min-h-full items-center justify-center p-4 text-center">

        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

        <Dialog.Panel className="flex flex-col w-full max-w-md max-h-full overflow-scroll transform rounded-2xl bg-white dark:bg-slate-800 p-6 text-left align-middle shadow-xl transition-all opacity-100 scale-100">
          <Dialog.Title className="text-lg font-medium leading-6 text-slate-900 dark:text-white">
            Vanliga frågor
          </Dialog.Title>

          <div className="flex flex-col gap-6 mt-4">
            <div>
              <Dialog.Title as="h3" className="text-sm font-medium leading-6 text-slate-900 dark:text-slate-50">
                Vilka tåg visas?
              </Dialog.Title>

              <Dialog.Description className="text-sm text-slate-500 dark:text-slate-300">
                Här visas alla tåg (förutom pendeltåg) mellan {from} och {to}.
                Sedan filtreras tågen med &quot;Movingo gäller ej.&quot; och &quot;Endast SJ-biljetter gäller.&quot; bort.
              </Dialog.Description>
              <Dialog.Description className="text-sm text-slate-500 dark:text-slate-300 pt-2">
                Detta innebär att det finns risk att tåg som inte stödjer movingo inte har filtrerats bort.
                Var uppmärksam på tågen i listan, detta är ett pågående arbete.
              </Dialog.Description>
            </div>

            <div>
              <Dialog.Title as="h3" className="text-sm font-medium leading-6 text-slate-900 dark:text-slate-50">
                Vilka trafikmeddelanden visas?
              </Dialog.Title>

              <Dialog.Description className="text-sm text-slate-500 dark:text-slate-300">
                Alla trafikmeddelanden för den station du åker från visas fram till och med den dagen de är planerade att vara lösta.
              </Dialog.Description>
            </div>

            <div>
              <Dialog.Title as="h3" className="text-sm font-medium leading-6 text-slate-900 dark:text-slate-50">
                Någonting som inte stämmer?
              </Dialog.Title>

              <Dialog.Description className="text-sm text-slate-500 dark:text-slate-300">
                All information kommer från <a href="https://api.trafikinfo.trafikverket.se/">Trafikverkets Öppna API</a>.
                De enda filtreringarna eller ändringar gjorta är de som nämnt ovan.
              </Dialog.Description>
            </div>
          </div>

          <Button className="mt-8 self-end" onClick={() => setIsOpen(false)}>
            Stäng
          </Button>
        </Dialog.Panel>
      </Dialog>
    </>
  )
}
