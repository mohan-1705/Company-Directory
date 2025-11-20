import { Company } from '../types/company';
import { Eye, MapPin, Users, Calendar, Star, Heart } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

interface CompanyTableProps {
  companies: Company[];
  onViewDetails: (company: Company) => void;
  favorites: Set<string>;
  onToggleFavorite: (companyId: string) => void;
}

export function CompanyTable({ companies, onViewDetails, favorites, onToggleFavorite }: CompanyTableProps) {
  return (
    <div className="border border-blue-100 rounded-lg overflow-hidden bg-white shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-50 hover:to-blue-100">
            <TableHead className="text-blue-900">Company</TableHead>
            <TableHead className="text-blue-900">Industry</TableHead>
            <TableHead className="text-blue-900">Location</TableHead>
            <TableHead className="text-blue-900">Employees</TableHead>
            <TableHead className="text-blue-900">Founded</TableHead>
            <TableHead className="text-blue-900">Rating</TableHead>
            <TableHead className="text-blue-900 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {companies.map((company) => (
            <TableRow key={company.id} className="hover:bg-blue-50/50 transition-colors">
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0 shadow-sm">
                    <span className="text-xl">{company.logo}</span>
                  </div>
                  <div className="min-w-0">
                    <div className="text-blue-900 truncate">{company.name}</div>
                    <div className="text-sm text-gray-500 truncate">{company.revenue}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="secondary" className="bg-yellow-100 text-yellow-900 hover:bg-yellow-200">
                  {company.industry}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1 text-gray-700">
                  <MapPin className="w-4 h-4 text-blue-500 flex-shrink-0" />
                  <span className="truncate">{company.location}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1 text-gray-700">
                  <Users className="w-4 h-4 text-blue-500 flex-shrink-0" />
                  <span>{company.employeeCount}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1 text-gray-700">
                  <Calendar className="w-4 h-4 text-blue-500 flex-shrink-0" />
                  <span>{company.founded}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="text-gray-700">{company.rating.toFixed(1)}</span>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onToggleFavorite(company.id)}
                    className={favorites.has(company.id) ? 'text-red-500 hover:text-red-600 hover:bg-red-50' : 'text-gray-400 hover:text-red-500 hover:bg-red-50'}
                  >
                    <Heart className={`w-4 h-4 ${favorites.has(company.id) ? 'fill-current' : ''}`} />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                    onClick={() => onViewDetails(company)}
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}