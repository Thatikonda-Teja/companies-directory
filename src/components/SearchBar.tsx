"use client"

import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../hooks/useRedux"
import { setSearchTerm } from "../store/slices/companiesSlice"
import { Search } from "lucide-react"

export function SearchBar() {
  const dispatch = useAppDispatch()
  const { searchTerm } = useAppSelector((state) => state.companies.filters)
  const [value, setValue] = useState(searchTerm)
  const [isSearching, setIsSearching] = useState(false)

  useEffect(() => {
    setIsSearching(true)
    const timer = setTimeout(() => {
      dispatch(setSearchTerm(value))
      setIsSearching(false)
    }, 300)

    return () => clearTimeout(timer)
  }, [value, dispatch])

  return (
    <div className="relative w-full">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
      <input
        type="text"
        placeholder="Search companies..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full pl-10 pr-4 py-2 sm:py-3 text-sm sm:text-base rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
      />
      {isSearching && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      )}
    </div>
  )
}
