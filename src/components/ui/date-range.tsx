"use client"

import * as React from "react"

export type DateRange = {
  from: Date | undefined
  to: Date | undefined
}

export type DateRangeProps = React.HTMLAttributes<HTMLDivElement> & {
  value?: DateRange
  onSelect?: (value: DateRange | undefined) => void
  disabled?: boolean
}
