import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Users, CreditCard, TrendingUp } from 'lucide-react';
import { useEvents } from '@/contexts/EventContext';

export const DashboardStats = () => {
  const { events, registrations } = useEvents();

  const totalRevenue = registrations.reduce((sum, reg) => {
    const event = events.find(e => e.id === reg.eventId);
    return sum + (event?.fees || 0);
  }, 0);

  const stats = [
    {
      title: 'Total Events',
      value: events.length,
      icon: Calendar,
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Total Registrations',
      value: registrations.length,
      icon: Users,
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Total Revenue',
      value: `₹${totalRevenue.toLocaleString()}`,
      icon: TrendingUp,
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Pending Payments',
      value: registrations.filter(r => r.paymentStatus === 'Pending').length,
      icon: CreditCard,
      color: 'from-amber-500 to-amber-600'
    }
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index} className="overflow-hidden animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${stat.color} flex items-center justify-center`}>
                <Icon className="h-5 w-5 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{stat.value}</div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
