"use client"

import { useMemo } from "react"
import { useAppSelector, useAppDispatch } from "../hooks/useRedux"
import { setCurrentPage, type Company } from "../store/slices/companiesSlice"

const ITEMS_PER_PAGE = 5

export function CompaniesTable() {
  const dispatch = useAppDispatch()
  const { filteredCompanies, filters } = useAppSelector((state) => state.companies)

  const paginatedCompanies = useMemo(() => {
    const startIndex = (filters.currentPage - 1) * ITEMS_PER_PAGE
    return filteredCompanies.slice(startIndex, startIndex + ITEMS_PER_PAGE)
  }, [filteredCompanies, filters.currentPage])

  const totalPages = Math.ceil(filteredCompanies.length / ITEMS_PER_PAGE)

  return (
    <div className="w-full space-y-4 flex flex-col h-full">
      {/* Fixed height container with scroll */}
      <div className="flex-1 overflow-hidden rounded-lg border border-border shadow-sm -mx-4 sm:mx-0">
        <div className="h-full overflow-auto">
          <table className="w-full min-w-max sm:min-w-full lg:min-w-full h-full">
            <thead className="sticky top-0 z-10 pl-2">
              <tr className="border-b border-border bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5">
                <th className="px-3 sm:px-4 py-2 sm:py-4 text-left text-xs sm:text-sm font-bold text-foreground whitespace-nowrap">
                  Company Name
                </th>
                <th className="px-3 sm:px-4 py-2 sm:py-4 text-left text-xs sm:text-sm font-bold text-foreground whitespace-nowrap">
                  Industry
                </th>
                <th className="px-3 sm:px-4 py-2 sm:py-4 text-left text-xs sm:text-sm font-bold text-foreground whitespace-nowrap">
                  Location
                </th>
                <th className="px-3 sm:px-4 py-2 sm:py-4 text-left text-xs sm:text-sm font-bold text-foreground whitespace-nowrap">
                  Employees
                </th>
                <th className="px-3 sm:px-4 py-2 sm:py-4 text-left text-xs sm:text-sm font-bold text-foreground whitespace-nowrap">
                  Revenue
                </th>
                <th className="px-3 sm:px-4 py-2 sm:py-4 text-left text-xs sm:text-sm font-bold text-foreground whitespace-nowrap">
                  Founded
                </th>
                <th className="px-3 sm:px-4 py-2 sm:py-4 text-left text-xs sm:text-sm font-bold text-foreground whitespace-nowrap">
                  Description
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedCompanies.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-3 sm:px-4 py-6 sm:py-8 text-center text-xs sm:text-sm text-muted-foreground "
                  >
                    No companies found matching your filters.
                  </td>
                </tr>
              ) : (
                paginatedCompanies.map((company: Company) => (
                  <tr
                    key={company.id}
                    className="border-b border-border hover:bg-primary/5 transition-colors duration-150"
                  >
                    <td className="px-3 sm:px-4 py-2 sm:py-4 font-semibold text-primary text-xs sm:text-sm">
                      {company.name}
                    </td>
                    <td className="px-3 sm:px-4 py-2 sm:py-4">
                      <span className="inline-block px-2 sm:px-3 py-1 sm:py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold whitespace-nowrap">
                        {company.industry}
                      </span>
                    </td>
                    <td className="px-3 sm:px-4 py-2 sm:py-4 text-xs sm:text-sm text-foreground whitespace-nowrap">
                      {company.location}
                    </td>
                    <td className="px-3 sm:px-4 py-2 sm:py-4 text-xs sm:text-sm text-foreground whitespace-nowrap">
                      {(company.employees / 1000).toFixed(1)}K
                    </td>
                    <td className="px-3 sm:px-4 py-2 sm:py-4 font-bold  text-xs sm:text-sm">
                      {company.revenue}
                    </td>
                    <td className="px-3 sm:px-4 py-2 sm:py-4 text-xs sm:text-sm text-foreground whitespace-nowrap">
                      {company.founded}
                    </td>
                    <td className="px-3 sm:px-4 py-2 sm:py-4 text-xs sm:text-sm text-foreground ">
                      {company.description}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination controls - fixed at bottom */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4 pt-4 px-4 sm:px-0">
          <button
            disabled={filters.currentPage === 1}
            onClick={() => dispatch(setCurrentPage(Math.max(1, filters.currentPage - 1)))}
            className="w-full sm:w-auto px-3 py-2 rounded-lg border border-input bg-background text-foreground hover:bg-primary/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-xs sm:text-sm font-semibold"
          >
            Previous
          </button>

          <div className="flex gap-1 flex-wrap justify-center">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => dispatch(setCurrentPage(page))}
                className={`px-2 sm:px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                  filters.currentPage === page
                    ? "bg-primary text-primary-foreground"
                    : "bg-transparent border border-input hover:bg-primary/10"
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            disabled={filters.currentPage === totalPages}
            onClick={() => dispatch(setCurrentPage(Math.min(totalPages, filters.currentPage + 1)))}
            className="w-full sm:w-auto px-3 py-2 rounded-lg border border-input bg-background text-foreground hover:bg-primary/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-xs sm:text-sm font-semibold"
          >
            Next
          </button>
        </div>
      )}

      <div className="text-center text-xs sm:text-sm text-muted-foreground pt-2 px-4 sm:px-0">
        Showing {paginatedCompanies.length > 0 ? (filters.currentPage - 1) * ITEMS_PER_PAGE + 1 : 0} to{" "}
        {Math.min(filters.currentPage * ITEMS_PER_PAGE, filteredCompanies.length)} of {filteredCompanies.length}{" "}
        companies
      </div>
    </div>
  )
}