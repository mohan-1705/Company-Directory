import { Company } from '../types/company';
import { Building2, MapPin, Users, Calendar, TrendingUp, Eye, Heart, Star } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

interface CompanyCardProps {
  company: Company;
  onViewDetails: () => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export function CompanyCard({ company, onViewDetails, isFavorite, onToggleFavorite }: CompanyCardProps) {
  return (
    <Card className="h-full hover:shadow-lg transition-shadow duration-300 border-blue-100 hover:border-blue-300">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 flex-1">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-md">
              <span className="text-2xl">{company.logo}</span>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-blue-900 truncate">{company.name}</h3>
              <Badge variant="secondary" className="mt-1 bg-yellow-100 text-yellow-900 hover:bg-yellow-200">
                {company.industry}
              </Badge>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite();
            }}
            className={isFavorite ? 'text-red-500 hover:text-red-600 hover:bg-red-50' : 'text-gray-400 hover:text-red-500 hover:bg-red-50'}
          >
            <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3 pb-3">
        <p className="text-gray-600 text-sm line-clamp-2">{company.description}</p>
        
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(company.rating)
                    ? 'text-yellow-400 fill-yellow-400'
                    : i < company.rating
                    ? 'text-yellow-400 fill-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-blue-900">{company.rating.toFixed(1)}</span>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <MapPin className="w-4 h-4 text-blue-500 flex-shrink-0" />
            <span className="truncate">{company.location}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <Users className="w-4 h-4 text-blue-500 flex-shrink-0" />
            <span>{company.employeeCount} employees</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <Calendar className="w-4 h-4 text-blue-500 flex-shrink-0" />
            <span>Founded {company.founded}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <TrendingUp className="w-4 h-4 text-blue-500 flex-shrink-0" />
            <span>{company.revenue}</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-3 border-t border-gray-100">
        <Button 
          variant="outline" 
          className="w-full group border-blue-200 text-blue-600 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300"
          onClick={onViewDetails}
        >
          <Eye className="w-4 h-4 mr-2" />
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
}