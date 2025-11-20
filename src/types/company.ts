export interface Company {
  id: string;
  name: string;
  industry: string;
  location: string;
  employeeCount: string;
  founded: number;
  description: string;
  website: string;
  revenue: string;
  logo: string;
  rating: number;
  email: string;
  phone: string;
  about: string;
  industryInsight: string;
}

export interface FilterState {
  search: string;
  industry: string;
  location: string;
  employeeCount: string;
}

export type SortField = 'name' | 'location' | 'industry' | 'founded';
export type SortOrder = 'asc' | 'desc';