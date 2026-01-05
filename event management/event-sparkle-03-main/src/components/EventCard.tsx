import { Calendar, MapPin, IndianRupee, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Event } from '@/contexts/EventContext';

interface EventCardProps {
  event: Event;
  onRegister: (event: Event) => void;
}

export const EventCard = ({ event, onRegister }: EventCardProps) => {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-[var(--shadow-hover)] border-border animate-fade-in group">
      <div className="h-2 bg-gradient-to-r from-primary to-accent" />
      <CardHeader>
        <CardTitle className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
          {event.name}
        </CardTitle>
        <CardDescription className="text-muted-foreground line-clamp-2">
          {event.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-start gap-2 text-sm text-foreground">
          <MapPin className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
          <span className="line-clamp-1">{event.location}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-foreground">
          <Calendar className="h-4 w-4 text-primary flex-shrink-0" />
          <span>{formatDate(event.date)}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-foreground">
          <Clock className="h-4 w-4 text-primary flex-shrink-0" />
          <span>{event.time}</span>
        </div>
        <div className="flex items-center gap-2 text-lg font-semibold text-primary pt-2">
          <IndianRupee className="h-5 w-5" />
          <span>{event.fees}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={() => onRegister(event)} 
          className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
        >
          Register Now
        </Button>
      </CardFooter>
    </Card>
  );
};
