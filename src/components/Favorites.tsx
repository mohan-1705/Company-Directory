import { Company } from '../types/company';
import { CompanyCard } from './CompanyCard';
import { Heart } from 'lucide-react';
import { Button } from './ui/button';

interface FavoritesProps {
  companies: Company[];
  favorites: Set<string>;
  onViewDetails: (company: Company) => void;
  onToggleFavorite: (companyId: string) => void;
}

export function Favorites({ companies, favorites, onViewDetails, onToggleFavorite }: FavoritesProps) {
  const favoriteCompanies = companies.filter(c => favorites.has(c.id));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-blue-900 mb-2">Favorite Companies</h1>
        <p className="text-gray-600">Companies you've marked as favorites for quick access</p>
      </div>

      {/* Favorites Grid */}
      {favoriteCompanies.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md border border-blue-100 p-12 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="w-8 h-8 text-red-500" />
          </div>
          <h3 className="text-gray-900 mb-2">No favorites yet</h3>
          <p className="text-gray-600 mb-4">
            Start adding companies to your favorites by clicking the heart icon
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {favoriteCompanies.map((company) => (
            <CompanyCard
              key={company.id}
              company={company}
              onViewDetails={() => onViewDetails(company)}
              isFavorite={true}
              onToggleFavorite={() => onToggleFavorite(company.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
