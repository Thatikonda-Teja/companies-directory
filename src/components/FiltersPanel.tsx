"use client"

import { useState, useMemo } from "react"
import { useAppSelector, useAppDispatch } from "../hooks/useRedux"
import {
  setSelectedIndustry,
  setSelectedLocation,
  setSelectedCompanyName,
  setSortBy,
  setSortOrder,
} from "../store/slices/companiesSlice"
import { X, ChevronDown } from "lucide-react"
import type { Company } from "../store/slices/companiesSlice"

export function FiltersPanel() {
  const dispatch = useAppDispatch()
  const { allCompanies, filters } = useAppSelector((state) => state.companies)
  const [isOpen, setIsOpen] = useState(false)

  const industries = useMemo(() => {
    return Array.from(new Set(allCompanies.map((c: Company) => c.industry)))
      .sort()
      .filter(Boolean)
  }, [allCompanies])

  const locations = useMemo(() => {
    return Array.from(new Set(allCompanies.map((c: Company) => c.location)))
      .sort()
      .filter(Boolean)
  }, [allCompanies])

  const companyNames = useMemo(() => {
    return Array.from(new Set(allCompanies.map((c: Company) => c.name)))
      .sort()
      .filter(Boolean)
  }, [allCompanies])

  const hasActiveFilters = filters.selectedIndustry || filters.selectedLocation || filters.selectedCompanyName

  const handleClearFilters = () => {
    dispatch(setSelectedIndustry(""))
    dispatch(setSelectedLocation(""))
    dispatch(setSelectedCompanyName(""))
    setIsOpen(false)
  }

  return (
    <>
      {/* Filter button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 flex items-center gap-2 px-4 py-3 bg-primary text-primary-foreground rounded-full shadow-lg hover:bg-primary/90 transition-all z-30 text-sm sm:text-base font-semibold"
      >
        <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
        Filters
      </button>

      <div
        className={`fixed inset-0 z-40 transition-opacity duration-300 ease-in-out ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black/50 transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />

        {/* Filter panel */}
        <div
          className={`
            fixed left-0 top-0 bottom-0 bg-card border-r border-border
            transform transition-transform duration-300 ease-in-out
            ${isOpen ? "translate-x-0" : "-translate-x-full"}
            overflow-y-auto z-50
            w-full max-w-xs sm:max-w-sm
          `}
        >
          <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
              <h3 className="text-base sm:text-lg font-bold text-foreground">Filters</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <button
                onClick={handleClearFilters}
                className="w-full px-3 py-2 bg-transparent border border-input rounded-lg text-xs sm:text-sm font-semibold hover:bg-primary/10 transition-all flex items-center justify-center gap-2"
              >
                <X className="w-4 h-4" />
                Clear All Filters
              </button>
            )}

            {/* Company Name */}
            <div className="space-y-2 sm:space-y-3">
              <label className="text-xs sm:text-sm font-semibold text-foreground block">Company Name</label>
              <select
                value={filters.selectedCompanyName}
                onChange={(e) => dispatch(setSelectedCompanyName(e.target.value))}
                className="w-full px-2 sm:px-3 py-2 sm:py-3 rounded-lg border border-input bg-background text-foreground text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
              >
                <option value="">All Companies</option>
                {companyNames.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </div>

            {/* Industry */}
            <div className="space-y-2 sm:space-y-3">
              <label className="text-xs sm:text-sm font-semibold text-foreground block">Industry</label>
              <select
                value={filters.selectedIndustry}
                onChange={(e) => dispatch(setSelectedIndustry(e.target.value))}
                className="w-full px-2 sm:px-3 py-2 sm:py-3 rounded-lg border border-input bg-background text-foreground text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
              >
                <option value="">All Industries</option>
                {industries.map((industry) => (
                  <option key={industry} value={industry} className="w-[70px]" >
                    {industry}
                  </option>
                ))}
              </select>
            </div>

            {/* Location */}
            <div className="space-y-2 sm:space-y-3">
              <label className="text-xs sm:text-sm font-semibold text-foreground block">Location</label>
              <select
                value={filters.selectedLocation}
                onChange={(e) => dispatch(setSelectedLocation(e.target.value))}
                className="w-full px-2 sm:px-3 py-2 sm:py-3 rounded-lg border border-input bg-background text-foreground text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
              >
                <option value="">All Locations</option>
                {locations.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort By */}
            <div className="space-y-2 sm:space-y-3 pt-4 sm:pt-6 border-t border-border">
              <label className="text-xs sm:text-sm font-semibold text-foreground block">Sort By</label>
              <select
                value={filters.sortBy}
                onChange={(e) =>
                  dispatch(setSortBy(e.target.value as "name" | "location" | "employees" | "revenue" | "founded"))
                }
                className="w-full px-2 sm:px-3 py-2 sm:py-3 rounded-lg border border-input bg-background text-foreground text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
              >
                <option value="name">Sort by Company Name</option>
                <option value="location">Sort by Location</option>
                <option value="employees">Sort by Employees</option>
                <option value="revenue">Sort by Revenue</option>
                <option value="founded">Sort by Founded Year</option>
              </select>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => dispatch(setSortOrder("asc"))}
                  className={`flex-1 px-2 sm:px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                    filters.sortOrder === "asc"
                      ? "bg-primary text-primary-foreground"
                      : "bg-transparent border border-input hover:bg-primary/10"
                  }`}
                >
                  Ascending
                </button>
                <button
                  onClick={() => dispatch(setSortOrder("desc"))}
                  className={`flex-1 px-2 sm:px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                    filters.sortOrder === "desc"
                      ? "bg-primary text-primary-foreground"
                      : "bg-transparent border border-input hover:bg-primary/10"
                  }`}
                >
                  Descending
                </button>
              </div>
            </div>

            {/* Active Filters */}
            <div className="pt-4 sm:pt-6 border-t border-border">
              <p className="text-xs text-muted-foreground line-clamp-3">
                <span className="font-semibold block mb-1">Active Filters:</span>{" "}
                {[
                  filters.selectedCompanyName && `Company: ${filters.selectedCompanyName}`,
                  filters.selectedIndustry && `Industry: ${filters.selectedIndustry}`,
                  filters.selectedLocation && `Location: ${filters.selectedLocation}`,
                ]
                  .filter(Boolean)
                  .join(", ") || "None"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
