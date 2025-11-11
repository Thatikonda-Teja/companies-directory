# Companies Directory Application

A professional React.js application built with Vite that displays and filters Indian company data with advanced search, sorting, and pagination capabilities.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Video Explanation](#video-explanation)
- [Key Implementation Details](#key-implementation-details)
- [Contributing](#contributing)

## Overview

Companies Directory is a full-featured web application designed to browse and explore Indian companies across multiple industries. The application provides a seamless user experience with responsive design, real-time search with debouncing, advanced filtering, and flexible sorting options.

## Features

### Core Functionality
- **100+ Indian Companies** - Comprehensive database across 10 industries
- **Advanced Filtering** - Filter by company name, industry, and location
- **Search with Debouncing** - Real-time search with 300ms debounce for optimal performance
- **Multi-Column Sorting** - Sort by company name, location, employees, revenue, or founding year
- **Pagination** - Display 10 companies per page with navigation controls
- **Responsive Design** - Mobile-first approach, fully responsive layout
- **Loading States** - Professional loading indicators and error handling

### User Interface
- Clean, modern design with gradient backgrounds
- Mobile-friendly sidebar filter panel
- Desktop optimized table layout
- Real-time filter status display
- Empty state messaging

## Tech Stack

- **Frontend Framework**: React 18.3
- **Build Tool**: Vite 5.0
- **State Management**: Redux Toolkit 1.9
- **Styling**: Tailwind CSS 4.1
- **Icons**: Lucide React 0.454
- **Language**: TypeScript 5.3
- **Package Manager**: NPM

## Project Structure

\`\`\`
companies-directory/
├── src/
│   ├── components/              # React components
│   │   ├── SearchBar.tsx       # Search input with debouncing
│   │   ├── FiltersPanel.tsx    # Filter and sort controls
│   │   └── CompaniesTable.tsx  # Companies display table
│   ├── store/
│   │   ├── store.ts            # Redux store configuration
│   │   └── slices/
│   │       └── companiesSlice.ts # Redux slice for companies data
│   ├── hooks/
│   │   └── useRedux.ts         # Redux hooks with TypeScript support
│   ├── styles/
│   │   └── index.css           # Tailwind CSS configuration
│   ├── App.tsx                 # Main application component
│   └── main.tsx                # Entry point
├── public/
│   └── mock-companies.json     # Mock company data (97 companies)
├── index.html                  # HTML template
├── vite.config.ts              # Vite configuration
├── tailwind.config.js          # Tailwind CSS config
├── postcss.config.js           # PostCSS config
├── tsconfig.json               # TypeScript configuration
└── package.json                # Project dependencies
\`\`\`

## Installation

### Prerequisites
- Node.js 16+ and npm installed

### Steps

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd companies-directory
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Start development server**
   \`\`\`bash
   npm run dev
   \`\`\`
   The application will open at `http://localhost:5173`

4. **Build for production**
   \`\`\`bash
   npm run build
   \`\`\`

5. **Preview production build**
   \`\`\`bash
   npm run preview
   \`\`\`

## Usage

### Getting Started

1. **View Companies** - On page load, all 97 Indian companies load automatically
2. **Search** - Type in the search bar to filter by company name or description (debounced)
3. **Filter** - Click "Filters" button on mobile or use sidebar on desktop
4. **Sort** - Select sort option and direction (ascending/descending)
5. **Paginate** - Navigate through 10 companies per page using pagination controls

### Filtering Options

- **Company Name**: Select a specific company
- **Industry**: Filter by industry type (Education, Technology, Finance, etc.)
- **Location**: Filter by city (Bangalore, Mumbai, Hyderabad, etc.)
- **Sort Options**:
  - Company Name (alphabetical)
  - Location (alphabetical)
  - Employees (numerical)
  - Revenue (numerical)
  - Founded Year (chronological)

### Responsive Features

- **Desktop**: Full sidebar visible, optimal table layout
- **Tablet**: Sidebar toggles with button
- **Mobile**: Floating filter button, slide-out filter panel, optimized table


## Key Implementation Details

### 1. Redux State Management (companiesSlice.ts)

The Redux slice manages:
- **allCompanies**: Original unmodified company data
- **filteredCompanies**: Result after applying all filters and sorting
- **filters**: Current state (search, industry, location, company name, sort)
- **loading**: Loading state for data fetching

Key function: `applyFilters()` - Combines all active filters and applies sorting

\`\`\`typescript
const applyFilters = (state: CompaniesState) => {
  let filtered = [...state.allCompanies]
  
  // Apply search filter
  if (state.filters.searchTerm) { ... }
  
  // Apply company name filter
  if (state.filters.selectedCompanyName) { ... }
  
  // Apply industry filter
  if (state.filters.selectedIndustry) { ... }
  
  // Apply location filter
  if (state.filters.selectedLocation) { ... }
  
  // Apply sorting
  filtered.sort((a, b) => { ... })
  
  state.filteredCompanies = filtered
}
\`\`\`

### 2. Debounced Search (SearchBar.tsx)

Implements performance-optimized search:
- 300ms debounce delay to reduce Redux updates
- Visual loading indicator during debounce
- Controlled input with local state
- Resets pagination on search

### 3. Responsive Filter Panel (FiltersPanel.tsx)

Features:
- Fixed overlay on mobile with slide-in animation
- Desktop: Static sidebar
- Dynamic options from company data
- Clear all filters functionality
- Active filter status display

### 4. Optimized Table with Pagination (CompaniesTable.tsx)

Features:
- useMemo for pagination calculation
- 5 items per page
- Previous/Next navigation
- Direct page number selection
- Company count display

### 5. Styling with Tailwind CSS

- Custom color theme via CSS variables
- Mobile-first responsive design
- Smooth transitions and animations
- Gradient backgrounds
- Consistent spacing and typography

## Performance Optimizations

1. **Debounced Search** - 300ms delay prevents excessive Redux updates
2. **useMemo Hooks** - Memoized computed values prevent unnecessary recalculations
3. **Redux State Slices** - Efficient state updates with Immer
4. **Lazy Filtering** - Filters applied on demand, not continuously
5. **Vite Fast HMR** - Instant hot module replacement during development

## Browser Support

- Chrome/Edge: Latest
- Firefox: Latest
- Safari: Latest 2 versions
- Mobile browsers: iOS Safari 12+, Chrome Android

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For issues, questions, or suggestions, please open an issue on the GitHub repository.

---

**Built with ❤️ using React, Vite, Redux, and Tailwind CSS**
