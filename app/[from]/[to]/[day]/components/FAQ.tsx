"use client"

import { Dialog } from "@headlessui/react"
import { useCallback, useEffect, useState } from "react"

import { HelpCircle } from "@/assets/icons/HelpCircle"
import { Button } from "@/components/Button"

export const FAQ = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [displayPulse, setDisplayPulse] = useState(false)

  const handleOpenDialog = useCallback(() => {
    setIsOpen(true)
    setDisplayPulse(false)
    localStorage?.setItem("openedFAQ", "true")
  }, [])

  useEffect(() => {
    const value = localStorage?.getItem("openedFAQ")
    if (value) {
      setDisplayPulse(value === "true" ? false : true)
      return
    }
    setDisplayPulse(true)
  }, [])

  return (
    <>
      <button
        aria-label="Vanliga frågor"
        onClick={handleOpenDialog}
        className="relative ml-1 text-slate-900 dark:text-white text-xl tracking-light text-center font-bold"
      >
        {displayPulse && (
          <>
            <span className="absolute top-0 right-0 animate-ping w-1.5 h-1.5 bg-emerald-600 rounded-full" />
            <span className="absolute top-0 right-0 w-1.5 h-1.5 bg-emerald-600 rounded-full" />
          </>
        )}
        <HelpCircle width={24} height={24} />
      </button>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="fixed z-30 top-0 left-0 right-0 bottom-0 flex min-h-full items-center justify-center p-4 text-center"
      >
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
                Vi hämtar tåg som går mellan Stockholm och Uppsala och filtrerar sedan ut tåg där Movingo biljetten inte
                gäller.
              </Dialog.Description>

              <ul className="list-disc pl-4 mt-2 text-sm text-slate-500 dark:text-slate-300">
                <li>Tåg med notifieringen &quot;Movingo gäller ej.&quot; visas ej.</li>
                <li>Tåg med notifieringen &quot;Endast SJ-biljetter gäller.&quot; visas ej.</li>
                <li>SJ InterCity tåg visas ej.</li>
              </ul>
            </div>

            <div>
              <Dialog.Title as="h3" className="text-sm font-medium leading-6 text-slate-900 dark:text-slate-50">
                Movingo 5/30 Biljett
              </Dialog.Title>

              <Dialog.Description className="text-sm text-slate-500 dark:text-slate-300">
                Det gäller olika regler för een Periodbiljett och en Movingo 5/30 biljett. Här visas tåg som är gilltiga
                för Periodbiljett.
                <br />
                Se mer på{" "}
                <a
                  className="text-sky-800 font-semibold"
                  target="_blank"
                  rel="noreferrer"
                  href="https://www.movingobiljett.se/"
                >
                  movingobiljett.se
                </a>
              </Dialog.Description>
            </div>

            <div>
              <Dialog.Title as="h3" className="text-sm font-medium leading-6 text-slate-900 dark:text-slate-50">
                Vilka trafikmeddelanden visas?
              </Dialog.Title>

              <Dialog.Description className="text-sm text-slate-500 dark:text-slate-300">
                Alla trafikmeddelanden för den station du åker från visas fram till och med den dagen de är planerade
                att vara lösta.
              </Dialog.Description>
            </div>

            <div>
              <Dialog.Title as="h3" className="text-sm font-medium leading-6 text-slate-900 dark:text-slate-50">
                Någonting som inte stämmer?
              </Dialog.Title>

              <Dialog.Description className="text-sm text-slate-500 dark:text-slate-300">
                All information kommer från{" "}
                <a href="https://api.trafikinfo.trafikverket.se/">Trafikverkets Öppna API</a>. De enda filtreringarna
                eller ändringar gjorta är de som nämnt ovan.
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
