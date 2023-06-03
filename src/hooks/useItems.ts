import { useCallback, useState } from "react"

export const useItems = () => {
  const [items, setItems] = useState<string[]>([])

  const addItem = useCallback((value: string): boolean => {
    const trimmedValue = value.trim()
    if (!trimmedValue) return false
    if (items.includes(trimmedValue)) return false
    setItems(items => ([...items, trimmedValue]))
    return true
  }, [items, setItems])

  const removeItem = useCallback((value: string) => {
    setItems(items => items.filter(item => item !== value))
  }, [setItems])

  return [items, addItem, removeItem] as const
}
