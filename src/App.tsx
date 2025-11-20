import { useState, useMemo, useEffect } from 'react';
import { CompanyCard } from './components/CompanyCard';
import { CompanyTable } from './components/CompanyTable';
import { CompanyDetails } from './components/CompanyDetails';
import { FilterPanel } from './components/FilterPanel';
import { Analytics } from './components/Analytics';
import { Favorites } from './components/Favorites';
import { mockCompanies, industries, locations, employeeCounts } from './data/mockCompanies';
import { Company, FilterState, SortField, SortOrder } from './types/company';
import { 
  LayoutGrid, 
  List, 
  ArrowUpDown, 
  Building2, 
  ChevronLeft, 
  ChevronRight,
  BarChart3,
  Heart
} from 'lucide-react';
import { Button } from './components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select';
import { Badge } from './components/ui/badge';

const ITEMS_PER_PAGE = 9;

type ViewType = 'directory' | 'analytics' | 'favorites' | 'details';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewType>('directory');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [favorites, setFavorites] = useState<Set<string>>(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });
  
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    industry: 'all',
    location: 'all',
    employeeCount: 'all'
  });
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [currentPage, setCurrentPage] = useState(1);

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(Array.from(favorites)));
  }, [favorites]);

  // Toggle favorite
  const toggleFavorite = (companyId: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(companyId)) {
        newFavorites.delete(companyId);
      } else {
        newFavorites.add(companyId);
      }
      return newFavorites;
    });
  };

  // Filter companies
  const filteredCompanies = useMemo(() => {
    return mockCompanies.filter((company) => {
      const matchesSearch = company.name.toLowerCase().includes(filters.search.toLowerCase());
      const matchesIndustry = filters.industry === 'all' || company.industry === filters.industry;
      const matchesLocation = filters.location === 'all' || company.location === filters.location;
      const matchesEmployeeCount = filters.employeeCount === 'all' || company.employeeCount === filters.employeeCount;

      return matchesSearch && matchesIndustry && matchesLocation && matchesEmployeeCount;
    });
  }, [filters]);

  // Sort companies
  const sortedCompanies = useMemo(() => {
    const sorted = [...filteredCompanies].sort((a, b) => {
      let aValue: string | number = a[sortField];
      let bValue: string | number = b[sortField];

      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
      }
      if (typeof bValue === 'string') {
        bValue = bValue.toLowerCase();
      }

      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    return sorted;
  }, [filteredCompanies, sortField, sortOrder]);

  // Pagination
  const totalPages = Math.ceil(sortedCompanies.length / ITEMS_PER_PAGE);
  const paginatedCompanies = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return sortedCompanies.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [sortedCompanies, currentPage]);

  // Reset to page 1 when filters change
  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  // Count active filters
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.search) count++;
    if (filters.industry !== 'all') count++;
    if (filters.location !== 'all') count++;
    if (filters.employeeCount !== 'all') count++;
    return count;
  }, [filters]);

  const handleViewDetails = (company: Company) => {
    setSelectedCompany(company);
    setCurrentView('details');
  };

  const handleBackToDirectory = () => {
    setCurrentView('directory');
    setSelectedCompany(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-400 rounded-lg flex items-center justify-center shadow-md">
                <Building2 className="w-6 h-6 text-blue-700" />
              </div>
              <div>
                <h1 className="text-white">Company Directory</h1>
                <p className="text-sm text-blue-100">Discover leading companies across industries</p>
              </div>
            </div>
            
            {/* Navigation */}
            <div className="flex items-center gap-2">
              <Button
                variant={currentView === 'directory' ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => setCurrentView('directory')}
                className={currentView === 'directory' 
                  ? 'bg-yellow-400 text-blue-900 hover:bg-yellow-500' 
                  : 'text-white hover:bg-blue-800'
                }
              >
                <Building2 className="w-4 h-4 mr-2" />
                Directory
              </Button>
              <Button
                variant={currentView === 'analytics' ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => setCurrentView('analytics')}
                className={currentView === 'analytics' 
                  ? 'bg-yellow-400 text-blue-900 hover:bg-yellow-500' 
                  : 'text-white hover:bg-blue-800'
                }
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                Analytics
              </Button>
              <Button
                variant={currentView === 'favorites' ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => setCurrentView('favorites')}
                className={currentView === 'favorites' 
                  ? 'bg-yellow-400 text-blue-900 hover:bg-yellow-500' 
                  : 'text-white hover:bg-blue-800'
                }
              >
                <Heart className="w-4 h-4 mr-2" />
                Favorites
                {favorites.size > 0 && (
                  <Badge className="ml-2 bg-red-500 text-white hover:bg-red-600">
                    {favorites.size}
                  </Badge>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {currentView === 'analytics' && (
          <Analytics companies={mockCompanies} />
        )}

        {currentView === 'favorites' && (
          <Favorites 
            companies={mockCompanies}
            favorites={favorites}
            onViewDetails={handleViewDetails}
            onToggleFavorite={toggleFavorite}
          />
        )}

        {currentView === 'details' && selectedCompany && (
          <CompanyDetails 
            company={selectedCompany}
            onBack={handleBackToDirectory}
            isFavorite={favorites.has(selectedCompany.id)}
            onToggleFavorite={() => toggleFavorite(selectedCompany.id)}
          />
        )}

        {currentView === 'directory' && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Filter Sidebar */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24">
                <FilterPanel
                  filters={filters}
                  industries={industries}
                  locations={locations}
                  employeeCounts={employeeCounts}
                  onFilterChange={handleFilterChange}
                  activeFilterCount={activeFilterCount}
                />
              </div>
            </aside>

            {/* Companies Display */}
            <div className="lg:col-span-3 space-y-6">
              {/* Toolbar */}
              <div className="bg-white rounded-lg shadow-md border border-blue-100 p-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge className="bg-yellow-400 text-blue-900 hover:bg-yellow-500">
                      {sortedCompanies.length} {sortedCompanies.length === 1 ? 'Company' : 'Companies'}
                    </Badge>
                    <span className="text-gray-700 text-sm">Sort by:</span>
                    <Select value={sortField} onValueChange={(value) => setSortField(value as SortField)}>
                      <SelectTrigger className="w-40 border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="name">Name</SelectItem>
                        <SelectItem value="location">Location</SelectItem>
                        <SelectItem value="industry">Industry</SelectItem>
                        <SelectItem value="founded">Founded Year</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                      className="border-gray-300 text-gray-700 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300"
                    >
                      <ArrowUpDown className="w-4 h-4 mr-1" />
                      {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
                    </Button>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-gray-700 text-sm mr-2">View:</span>
                    <Button
                      variant={viewMode === 'grid' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setViewMode('grid')}
                      className={viewMode === 'grid' 
                        ? 'bg-blue-600 hover:bg-blue-700' 
                        : 'border-gray-300 text-gray-700 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300'
                      }
                    >
                      <LayoutGrid className="w-4 h-4" />
                    </Button>
                    <Button
                      variant={viewMode === 'table' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setViewMode('table')}
                      className={viewMode === 'table' 
                        ? 'bg-blue-600 hover:bg-blue-700' 
                        : 'border-gray-300 text-gray-700 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300'
                      }
                    >
                      <List className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Companies Grid/Table */}
              {paginatedCompanies.length === 0 ? (
                <div className="bg-white rounded-lg shadow-md border border-blue-100 p-12 text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Building2 className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-gray-900 mb-2">No companies found</h3>
                  <p className="text-gray-600 mb-4">Try adjusting your filters to see more results</p>
                  <Button 
                    onClick={() => handleFilterChange({ search: '', industry: 'all', location: 'all', employeeCount: 'all' })}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Clear Filters
                  </Button>
                </div>
              ) : viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {paginatedCompanies.map((company) => (
                    <CompanyCard 
                      key={company.id} 
                      company={company}
                      onViewDetails={() => handleViewDetails(company)}
                      isFavorite={favorites.has(company.id)}
                      onToggleFavorite={() => toggleFavorite(company.id)}
                    />
                  ))}
                </div>
              ) : (
                <CompanyTable 
                  companies={paginatedCompanies}
                  onViewDetails={handleViewDetails}
                  favorites={favorites}
                  onToggleFavorite={toggleFavorite}
                />
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="bg-white rounded-lg shadow-md border border-blue-100 p-4">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-600">
                      Showing {((currentPage - 1) * ITEMS_PER_PAGE) + 1} to {Math.min(currentPage * ITEMS_PER_PAGE, sortedCompanies.length)} of {sortedCompanies.length} companies
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="border-gray-300 text-gray-700 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300 disabled:opacity-50"
                      >
                        <ChevronLeft className="w-4 h-4 mr-1" />
                        Previous
                      </Button>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                          <Button
                            key={page}
                            variant={currentPage === page ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setCurrentPage(page)}
                            className={currentPage === page 
                              ? 'bg-blue-600 hover:bg-blue-700 min-w-[36px]' 
                              : 'border-gray-300 text-gray-700 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300 min-w-[36px]'
                            }
                          >
                            {page}
                          </Button>
                        ))}
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="border-gray-300 text-gray-700 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300 disabled:opacity-50"
                      >
                        Next
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-blue-700 to-blue-800 text-white mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center">
                <Building2 className="w-5 h-5 text-blue-700" />
              </div>
              <span className="text-sm">© 2025 Company Directory. All rights reserved.</span>
            </div>
            <div className="text-sm text-blue-200">
              Built with React & Tailwind CSS
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
