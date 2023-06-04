"use client"

import { RefreshTrainsButton } from "./components/RefreshTrainsButton"
import { SwitchDestinationButton } from "./components/SwitchDestinationButton"

export default function Page() {
  return (
    <main>
      <RefreshTrainsButton />
      <SwitchDestinationButton />
    </main>
  )
}
