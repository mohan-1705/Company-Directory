import { useMemo } from 'react';
import { Company } from '../types/company';
import { Card, CardContent, CardHeader } from './ui/card';
import { 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';
import { TrendingUp, Building2, MapPin, Users, Star } from 'lucide-react';
import { Badge } from './ui/badge';

interface AnalyticsProps {
  companies: Company[];
}

const COLORS = ['#2563eb', '#3b82f6', '#60a5fa', '#93c5fd', '#dbeafe', '#fbbf24', '#fcd34d', '#fde68a'];

export function Analytics({ companies }: AnalyticsProps) {
  // Industry distribution
  const industryData = useMemo(() => {
    const counts: Record<string, number> = {};
    companies.forEach(c => {
      counts[c.industry] = (counts[c.industry] || 0) + 1;
    });
    return Object.entries(counts)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  }, [companies]);

  // Location distribution (top 10)
  const locationData = useMemo(() => {
    const counts: Record<string, number> = {};
    companies.forEach(c => {
      counts[c.location] = (counts[c.location] || 0) + 1;
    });
    return Object.entries(counts)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 10);
  }, [companies]);

  // Employee size distribution
  const employeeData = useMemo(() => {
    const counts: Record<string, number> = {};
    companies.forEach(c => {
      counts[c.employeeCount] = (counts[c.employeeCount] || 0) + 1;
    });
    return Object.entries(counts)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => {
        const order = ['100-200', '200-500', '500-1000', '1000-5000', '5000+'];
        return order.indexOf(a) - order.indexOf(b);
      });
  }, [companies]);

  // Revenue distribution
  const revenueData = useMemo(() => {
    const counts: Record<string, number> = {};
    companies.forEach(c => {
      counts[c.revenue] = (counts[c.revenue] || 0) + 1;
    });
    return Object.entries(counts)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => {
        const order = ['$10M - $50M', '$50M - $100M', '$100M - $500M', '$500M+'];
        return order.indexOf(a) - order.indexOf(b);
      });
  }, [companies]);

  // Average rating by industry
  const ratingByIndustry = useMemo(() => {
    const data: Record<string, { total: number; count: number }> = {};
    companies.forEach(c => {
      if (!data[c.industry]) {
        data[c.industry] = { total: 0, count: 0 };
      }
      data[c.industry].total += c.rating;
      data[c.industry].count += 1;
    });
    return Object.entries(data)
      .map(([name, { total, count }]) => ({ 
        name, 
        rating: Number((total / count).toFixed(2)) 
      }))
      .sort((a, b) => b.rating - a.rating);
  }, [companies]);

  // Top rated companies
  const topRatedCompanies = useMemo(() => {
    return [...companies]
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 5);
  }, [companies]);

  // Companies founded over time
  const companiesByYear = useMemo(() => {
    const counts: Record<number, number> = {};
    companies.forEach(c => {
      counts[c.founded] = (counts[c.founded] || 0) + 1;
    });
    return Object.entries(counts)
      .map(([year, value]) => ({ year: Number(year), companies: value }))
      .sort((a, b) => a.year - b.year);
  }, [companies]);

  const avgRating = useMemo(() => {
    return (companies.reduce((sum, c) => sum + c.rating, 0) / companies.length).toFixed(2);
  }, [companies]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-blue-900 mb-2">Analytics Dashboard</h1>
        <p className="text-gray-600">Comprehensive insights into company data and trends</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-blue-100">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Companies</p>
                <p className="text-blue-900">{companies.length}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                <Building2 className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-100">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Industries</p>
                <p className="text-blue-900">{industryData.length}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-yellow-100 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-100">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Locations</p>
                <p className="text-blue-900">{locationData.length}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                <MapPin className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-100">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Avg Rating</p>
                <p className="text-blue-900">{avgRating}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-yellow-100 flex items-center justify-center">
                <Star className="w-6 h-6 text-yellow-600 fill-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Industry Distribution */}
        <Card className="border-blue-100">
          <CardHeader>
            <h3 className="text-blue-900">Companies by Industry</h3>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={industryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name.split(' ')[0]} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {industryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top Locations */}
        <Card className="border-blue-100">
          <CardHeader>
            <h3 className="text-blue-900">Top 10 Locations</h3>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={locationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} fontSize={12} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#2563eb" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Employee Size Distribution */}
        <Card className="border-blue-100">
          <CardHeader>
            <h3 className="text-blue-900">Company Size Distribution</h3>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={employeeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#fbbf24" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Revenue Distribution */}
        <Card className="border-blue-100">
          <CardHeader>
            <h3 className="text-blue-900">Revenue Distribution</h3>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-20} textAnchor="end" height={80} fontSize={12} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#2563eb" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 3 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Average Rating by Industry */}
        <Card className="border-blue-100">
          <CardHeader>
            <h3 className="text-blue-900">Average Rating by Industry</h3>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={ratingByIndustry} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 5]} />
                <YAxis type="category" dataKey="name" width={150} fontSize={12} />
                <Tooltip />
                <Bar dataKey="rating" fill="#fbbf24" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Companies Founded Over Time */}
        <Card className="border-blue-100">
          <CardHeader>
            <h3 className="text-blue-900">Companies Founded Over Time</h3>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={companiesByYear}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="companies" stroke="#2563eb" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Top Rated Companies */}
      <Card className="border-blue-100">
        <CardHeader>
          <h3 className="text-blue-900">Top 5 Rated Companies</h3>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topRatedCompanies.map((company, index) => (
              <div key={company.id} className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-4 flex-1">
                  <Badge className="bg-yellow-400 text-blue-900 w-8 h-8 flex items-center justify-center rounded-full">
                    {index + 1}
                  </Badge>
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-md">
                    <span className="text-2xl">{company.logo}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-blue-900 truncate">{company.name}</h4>
                    <p className="text-sm text-gray-600">{company.industry}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(company.rating)
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-blue-900">{company.rating.toFixed(1)}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
