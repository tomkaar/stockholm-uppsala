import { ReactNode } from "react"
import { mutate } from "swr"

import { ArrowsRound } from "@/assets/icons/ArrowsRound"
import ErrorBoundaryComponent from "@/components/ErrorBoundary"

export interface IAdditionalInformation {
  operationalTrainNumber: string
  scheduledDepartureDateTime: string
  isCommuterTrain?: boolean
}

const ErrorContent = ({ operationalTrainNumber, scheduledDepartureDateTime }: IAdditionalInformation) => {
  const searchParams = new URLSearchParams({ operationalTrainNumber, scheduledDepartureDateTime }).toString()
  const URL = "/api/train?" + searchParams

  return (
    <div className="flex flex-row justify-between items-center">
      <div className="space-y-1">
        <h4 className="text-md font-medium leading-4 text-slate-900 dark:text-slate-300">Någonting gick fel</h4>
        <p className="text-xs text-slate-900 dark:text-slate-300">Kunde inte ladda tidtabellen, försök igen senare</p>
      </div>

      <button
        onClick={() => mutate(URL)}
        className="flex flex-row justify-center items-center rounded-full p-1 w-8 h-8 bg-slate-300 dark:db-slate-800"
      >
        <ArrowsRound width={20} height={20} className="rotate-90" />
      </button>
    </div>
  )
}

export const ErrorBoundary = ({ children, ...props }: IAdditionalInformation & { children: ReactNode }) => (
  <ErrorBoundaryComponent fallback={<ErrorContent {...props} />}>{children}</ErrorBoundaryComponent>
)
