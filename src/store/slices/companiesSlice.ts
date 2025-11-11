import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface Company {
  id: number
  name: string
  industry: string
  location: string
  employees: number
  revenue: string
  founded: number
  description: string
}

interface FiltersState {
  searchTerm: string
  selectedIndustry: string
  selectedLocation: string
  selectedCompanyName: string
  sortBy: "name" | "location" | "employees" | "revenue" | "founded"
  sortOrder: "asc" | "desc"
  currentPage: number
}

interface CompaniesState {
  allCompanies: Company[]
  filteredCompanies: Company[]
  filters: FiltersState
  loading: boolean
}

const initialState: CompaniesState = {
  allCompanies: [],
  filteredCompanies: [],
  filters: {
    searchTerm: "",
    selectedIndustry: "",
    selectedLocation: "",
    selectedCompanyName: "",
    sortBy: "name",
    sortOrder: "asc",
    currentPage: 1,
  },
  loading: false,
}

const companiesSlice = createSlice({
  name: "companies",
  initialState,
  reducers: {
    setCompanies: (state, action: PayloadAction<Company[]>) => {
      state.allCompanies = action.payload
      state.filteredCompanies = action.payload
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.filters.searchTerm = action.payload
      state.filters.currentPage = 1
      applyFilters(state)
    },
    setSelectedIndustry: (state, action: PayloadAction<string>) => {
      state.filters.selectedIndustry = action.payload
      state.filters.currentPage = 1
      applyFilters(state)
    },
    setSelectedLocation: (state, action: PayloadAction<string>) => {
      state.filters.selectedLocation = action.payload
      state.filters.currentPage = 1
      applyFilters(state)
    },
    setSelectedCompanyName: (state, action: PayloadAction<string>) => {
      state.filters.selectedCompanyName = action.payload
      state.filters.currentPage = 1
      applyFilters(state)
    },
    setSortBy: (state, action: PayloadAction<"name" | "location" | "employees" | "revenue" | "founded">) => {
      state.filters.sortBy = action.payload
      state.filters.currentPage = 1
      applyFilters(state)
    },
    setSortOrder: (state, action: PayloadAction<"asc" | "desc">) => {
      state.filters.sortOrder = action.payload
      applyFilters(state)
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.filters.currentPage = action.payload
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
  },
})

const applyFilters = (state: CompaniesState) => {
  let filtered = [...state.allCompanies]

  if (state.filters.searchTerm) {
    const term = state.filters.searchTerm.toLowerCase()
    filtered = filtered.filter(
      (company) => company.name.toLowerCase().includes(term) || company.description.toLowerCase().includes(term),
    )
  }

  if (state.filters.selectedCompanyName) {
    filtered = filtered.filter((company) => company.name === state.filters.selectedCompanyName)
  }

  if (state.filters.selectedIndustry) {
    filtered = filtered.filter((company) => company.industry === state.filters.selectedIndustry)
  }

  if (state.filters.selectedLocation) {
    filtered = filtered.filter((company) => company.location === state.filters.selectedLocation)
  }

  filtered.sort((a, b) => {
    let compareValue = 0

    switch (state.filters.sortBy) {
      case "name":
        compareValue = a.name.localeCompare(b.name)
        break
      case "location":
        compareValue = a.location.localeCompare(b.location)
        break
      case "employees":
        compareValue = a.employees - b.employees
        break
      case "revenue":
        const revenueA = Number.parseFloat(a.revenue.replace(/[^0-9.]/g, ""))
        const revenueB = Number.parseFloat(b.revenue.replace(/[^0-9.]/g, ""))
        compareValue = revenueA - revenueB
        break
      case "founded":
        compareValue = a.founded - b.founded
        break
    }

    return state.filters.sortOrder === "asc" ? compareValue : -compareValue
  })

  state.filteredCompanies = filtered
}

export const {
  setCompanies,
  setSearchTerm,
  setSelectedIndustry,
  setSelectedLocation,
  setSelectedCompanyName,
  setSortBy,
  setSortOrder,
  setCurrentPage,
  setLoading,
} = companiesSlice.actions

export default companiesSlice.reducer
