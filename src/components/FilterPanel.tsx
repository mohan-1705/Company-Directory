import { Search, X, Filter } from 'lucide-react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { FilterState } from '../types/company';

interface FilterPanelProps {
  filters: FilterState;
  industries: string[];
  locations: string[];
  employeeCounts: string[];
  onFilterChange: (filters: FilterState) => void;
  activeFilterCount: number;
}

export function FilterPanel({
  filters,
  industries,
  locations,
  employeeCounts,
  onFilterChange,
  activeFilterCount
}: FilterPanelProps) {
  const handleReset = () => {
    onFilterChange({
      search: '',
      industry: 'all',
      location: 'all',
      employeeCount: 'all'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-blue-100 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-blue-600" />
          <h2 className="text-blue-900">Filters</h2>
          {activeFilterCount > 0 && (
            <Badge className="bg-yellow-400 text-yellow-900 hover:bg-yellow-500">
              {activeFilterCount}
            </Badge>
          )}
        </div>
        {activeFilterCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleReset}
            className="text-gray-600 hover:text-blue-600 hover:bg-blue-50"
          >
            <X className="w-4 h-4 mr-1" />
            Clear All
          </Button>
        )}
      </div>

      <div className="space-y-4">
        {/* Search */}
        <div className="space-y-2">
          <Label htmlFor="search" className="text-gray-700">Search Company</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              id="search"
              type="text"
              placeholder="Search by name..."
              value={filters.search}
              onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
              className="pl-9 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Industry Filter */}
        <div className="space-y-2">
          <Label htmlFor="industry" className="text-gray-700">Industry</Label>
          <Select
            value={filters.industry}
            onValueChange={(value) => onFilterChange({ ...filters, industry: value })}
          >
            <SelectTrigger id="industry" className="border-gray-300 focus:border-blue-500 focus:ring-blue-500">
              <SelectValue placeholder="All Industries" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Industries</SelectItem>
              {industries.map((industry) => (
                <SelectItem key={industry} value={industry}>
                  {industry}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Location Filter */}
        <div className="space-y-2">
          <Label htmlFor="location" className="text-gray-700">Location</Label>
          <Select
            value={filters.location}
            onValueChange={(value) => onFilterChange({ ...filters, location: value })}
          >
            <SelectTrigger id="location" className="border-gray-300 focus:border-blue-500 focus:ring-blue-500">
              <SelectValue placeholder="All Locations" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              {locations.map((location) => (
                <SelectItem key={location} value={location}>
                  {location}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Employee Count Filter */}
        <div className="space-y-2">
          <Label htmlFor="employees" className="text-gray-700">Company Size</Label>
          <Select
            value={filters.employeeCount}
            onValueChange={(value) => onFilterChange({ ...filters, employeeCount: value })}
          >
            <SelectTrigger id="employees" className="border-gray-300 focus:border-blue-500 focus:ring-blue-500">
              <SelectValue placeholder="All Sizes" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sizes</SelectItem>
              {employeeCounts.map((count) => (
                <SelectItem key={count} value={count}>
                  {count} employees
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
