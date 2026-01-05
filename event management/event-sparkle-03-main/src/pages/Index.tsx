import { useState } from 'react';
import { Link } from 'react-router-dom';
import { EventCard } from '@/components/EventCard';
import { RegistrationModal } from '@/components/RegistrationModal';
import { useEvents, Event } from '@/contexts/EventContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar, Search, Shield } from 'lucide-react';

const Index = () => {
  const { events } = useEvents();
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEvents = events.filter(event =>
    event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card sticky top-0 z-50 shadow-[var(--shadow-soft)]">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-primary to-accent flex items-center justify-center">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">EventHub</h1>
                <p className="text-sm text-muted-foreground">Discover & Register for Amazing Events</p>
              </div>
            </div>
            <Link to="/admin/login">
              <Button variant="outline" className="gap-2">
                <Shield className="h-4 w-4" />
                Admin
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-accent to-primary py-20 px-4">
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        <div className="container mx-auto relative">
          <div className="max-w-3xl mx-auto text-center space-y-6 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Discover Events That Matter
            </h2>
            <p className="text-lg md:text-xl text-white/90">
              Register for workshops, hackathons, cultural fests, and tech summits. Join the community and expand your horizons.
            </p>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-12">
        <div className="mb-8 max-w-md mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search events by name or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {filteredEvents.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-muted-foreground">No events found matching your search.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredEvents.map((event, index) => (
              <div key={event.id} style={{ animationDelay: `${index * 100}ms` }}>
                <EventCard event={event} onRegister={setSelectedEvent} />
              </div>
            ))}
          </div>
        )}
      </main>

      <RegistrationModal
        event={selectedEvent}
        open={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />
    </div>
  );
};

export default Index;
