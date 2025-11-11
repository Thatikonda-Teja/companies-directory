"use client"

import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "./hooks/useRedux"
import { setCompanies, setLoading } from "./store/slices/companiesSlice"
import { SearchBar } from "./components/SearchBar"
import { FiltersPanel } from "./components/FiltersPanel"
import { CompaniesTable } from "./components/CompaniesTable"
import { Building2 } from "lucide-react"

function App() {
  const dispatch = useAppDispatch()
  const { loading, filteredCompanies, allCompanies } = useAppSelector((state) => state.companies)

  useEffect(() => {
    const loadCompanies = async () => {
      dispatch(setLoading(true))
      try {
        const response = await fetch("/mock-companies.json")
        const data = await response.json()
        dispatch(setCompanies(data.companies))
      } catch (error) {
        console.error("Failed to load companies:", error)
      } finally {
        dispatch(setLoading(false))
      }
    }

    loadCompanies()
  }, [dispatch])

  return (
    <main className="h-screen flex flex-col overflow-hidden bg-gradient-to-br from-background via-background to-secondary/10">
      {/* ===== Header (always visible) ===== */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
          <div className="flex items-center gap-3 flex-col sm:flex-row text-center sm:text-left">
            <div className="p-1 bg-primary/10 rounded-lg">
              <Building2 className="w-5 h-5 sm:w-4 h-4 text-primary" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-foreground">Companies Directory</h1>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                Explore {allCompanies.length} Indian companies across multiple industries
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* ===== Sticky SearchBar under header ===== */}
      <div className="bg-card border-b border-border sticky top-[4.5rem] z-20 px-4 sm:px-3 py-3">
        <div className="max-w-7xl mx-auto">
          <SearchBar />
        </div>
      </div>

      {/* ===== Main Scrollable Content ===== */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full overflow-auto px-4 sm:px-6 py-4">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <FiltersPanel />
            </div>

            {/* Table Section */}
            <div className="lg:col-span-3">
              {loading ? (
                <div className="bg-card border border-border rounded-lg p-8 sm:p-12 flex flex-col items-center justify-center min-h-64">
                  <div className="w-8 h-8 border-3 border-primary/30 border-t-primary rounded-full animate-spin mb-4" />
                  <p className="text-muted-foreground text-sm sm:text-base">Loading companies data...</p>
                </div>
              ) : filteredCompanies.length === 0 ? (
                <div className="bg-card border border-border rounded-lg p-8 sm:p-12 flex flex-col items-center justify-center text-center min-h-64">
                  <Building2 className="w-10 sm:w-12 h-10 sm:h-12 text-muted-foreground/30 mb-4" />
                  <p className="text-foreground font-semibold mb-1 text-sm sm:text-base">No companies found</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">Try adjusting your filters or search terms</p>
                </div>
              ) : (
                <div className="bg-card border border-border rounded-lg shadow-sm h-[calc(100vh-16rem)] overflow-hidden">
                  {/* Table content scrolls inside */}
                  <CompaniesTable />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default App
