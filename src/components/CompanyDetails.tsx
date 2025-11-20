import { Company } from '../types/company';
import { 
  ArrowLeft, 
  Star, 
  MapPin, 
  Users, 
  Calendar, 
  TrendingUp, 
  Mail, 
  Phone, 
  Globe, 
  Building2,
  Heart,
  Briefcase,
  DollarSign
} from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader } from './ui/card';
import { Separator } from './ui/separator';

interface CompanyDetailsProps {
  company: Company;
  onBack: () => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export function CompanyDetails({ company, onBack, isFavorite, onToggleFavorite }: CompanyDetailsProps) {
  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Button 
        variant="ghost" 
        onClick={onBack}
        className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Directory
      </Button>

      {/* Header Card */}
      <Card className="border-blue-100">
        <CardHeader>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start gap-4 flex-1">
              <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg flex-shrink-0">
                <span className="text-4xl">{company.logo}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start gap-3 mb-2">
                  <h1 className="text-blue-900">{company.name}</h1>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onToggleFavorite}
                    className={isFavorite ? 'text-red-500 hover:text-red-600' : 'text-gray-400 hover:text-red-500'}
                  >
                    <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
                  </Button>
                </div>
                <Badge className="bg-yellow-100 text-yellow-900 hover:bg-yellow-200 mb-3">
                  {company.industry}
                </Badge>
                <div className="flex items-center gap-2 text-gray-700">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(company.rating)
                            ? 'text-yellow-400 fill-yellow-400'
                            : i < company.rating
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-blue-900">{company.rating.toFixed(1)}</span>
                  <span className="text-gray-500">Rating</span>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* About Company */}
          <Card className="border-blue-100">
            <CardHeader>
              <h2 className="text-blue-900 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-blue-600" />
                About Company
              </h2>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">{company.about}</p>
            </CardContent>
          </Card>

          {/* Industry Insights */}
          <Card className="border-blue-100 bg-gradient-to-br from-blue-50 to-white">
            <CardHeader>
              <h2 className="text-blue-900 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                Industry Insights
              </h2>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">{company.industryInsight}</p>
            </CardContent>
          </Card>

          {/* Company Stats */}
          <Card className="border-blue-100">
            <CardHeader>
              <h2 className="text-blue-900">Company Statistics</h2>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-gray-600 text-sm">
                    <Calendar className="w-4 h-4 text-blue-500" />
                    <span>Founded</span>
                  </div>
                  <p className="text-gray-900">{company.founded}</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-gray-600 text-sm">
                    <Users className="w-4 h-4 text-blue-500" />
                    <span>Employees</span>
                  </div>
                  <p className="text-gray-900">{company.employeeCount}</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-gray-600 text-sm">
                    <DollarSign className="w-4 h-4 text-blue-500" />
                    <span>Revenue</span>
                  </div>
                  <p className="text-gray-900">{company.revenue}</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-gray-600 text-sm">
                    <MapPin className="w-4 h-4 text-blue-500" />
                    <span>Location</span>
                  </div>
                  <p className="text-gray-900">{company.location}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Contact Information */}
          <Card className="border-blue-100 sticky top-24">
            <CardHeader>
              <h2 className="text-blue-900">Contact Information</h2>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Website */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <Globe className="w-4 h-4 text-blue-500" />
                  <span>Website</span>
                </div>
                <a 
                  href={`https://${company.website}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block text-blue-600 hover:text-blue-700 hover:underline break-all"
                >
                  {company.website}
                </a>
              </div>

              <Separator />

              {/* Email */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <Mail className="w-4 h-4 text-blue-500" />
                  <span>Email</span>
                </div>
                <a 
                  href={`mailto:${company.email}`}
                  className="block text-blue-600 hover:text-blue-700 hover:underline break-all"
                >
                  {company.email}
                </a>
              </div>

              <Separator />

              {/* Phone */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <Phone className="w-4 h-4 text-blue-500" />
                  <span>Phone</span>
                </div>
                <a 
                  href={`tel:${company.phone}`}
                  className="block text-blue-600 hover:text-blue-700 hover:underline"
                >
                  {company.phone}
                </a>
              </div>

              <Separator />

              {/* Industry */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <Briefcase className="w-4 h-4 text-blue-500" />
                  <span>Industry</span>
                </div>
                <p className="text-gray-900">{company.industry}</p>
              </div>

              <div className="pt-4">
                <Button 
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  onClick={() => window.open(`https://${company.website}`, '_blank')}
                >
                  Visit Website
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
