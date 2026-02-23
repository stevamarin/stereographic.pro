"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface DialogContextType {
  isDialogOpen: boolean
  setDialogOpen: (open: boolean) => void
  menuOpenRequestCount: number
  requestMenuOpen: () => void
}

const DialogContext = createContext<DialogContextType | undefined>(undefined)

export function DialogProvider({ children }: { children: ReactNode }) {
  const [isDialogOpen, setDialogOpen] = useState(false)
  const [menuOpenRequestCount, setMenuOpenRequestCount] = useState(0)
  const requestMenuOpen = () => setMenuOpenRequestCount(c => c + 1)

  return (
    <DialogContext.Provider value={{ isDialogOpen, setDialogOpen, menuOpenRequestCount, requestMenuOpen }}>
      {children}
    </DialogContext.Provider>
  )
}

export function useDialog() {
  const context = useContext(DialogContext)
  if (context === undefined) {
    throw new Error("useDialog must be used within a DialogProvider")
  }
  return context
}
