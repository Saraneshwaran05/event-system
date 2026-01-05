import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Event {
  id: string;
  name: string;
  description: string;
  location: string;
  date: string;
  time: string;
  fees: number;
}

export interface Registration {
  id: string;
  eventId: string;
  eventName: string;
  fullName: string;
  email: string;
  phone: string;
  college: string;
  paymentOption: string;
  paymentStatus: 'Pending' | 'Completed';
  registeredAt: string;
}

interface EventContextType {
  events: Event[];
  registrations: Registration[];
  addEvent: (event: Omit<Event, 'id'>) => void;
  updateEvent: (id: string, event: Omit<Event, 'id'>) => void;
  deleteEvent: (id: string) => void;
  addRegistration: (registration: Omit<Registration, 'id' | 'registeredAt' | 'paymentStatus'>) => void;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

const initialEvents: Event[] = [
  {
    id: '1',
    name: 'Tech Innovation Summit 2025',
    description: 'Join industry leaders for a day of innovation, networking, and inspiration. Learn about the latest trends in technology and connect with fellow professionals.',
    location: 'Grand Convention Center, Hall A',
    date: '2025-11-15',
    time: '09:00 AM',
    fees: 1500
  },
  {
    id: '2',
    name: 'Cultural Fest - Harmony',
    description: 'Experience diverse cultural performances, food stalls, and interactive workshops celebrating unity in diversity.',
    location: 'University Main Auditorium',
    date: '2025-11-20',
    time: '05:00 PM',
    fees: 500
  },
  {
    id: '3',
    name: 'Hackathon 48: Code for Change',
    description: '48-hour coding marathon to build innovative solutions for real-world problems. Prizes worth ₹50,000 up for grabs!',
    location: 'Innovation Hub, IT Block',
    date: '2025-12-01',
    time: '10:00 AM',
    fees: 800
  },
  {
    id: '4',
    name: 'Workshop: AI & Machine Learning',
    description: 'Hands-on workshop covering fundamentals of AI/ML with practical implementation using Python and TensorFlow.',
    location: 'Computer Lab 3, Building B',
    date: '2025-11-25',
    time: '02:00 PM',
    fees: 600
  }
];

export const EventProvider = ({ children }: { children: ReactNode }) => {
  const [events, setEvents] = useState<Event[]>(() => {
    const stored = localStorage.getItem('events');
    return stored ? JSON.parse(stored) : initialEvents;
  });

  const [registrations, setRegistrations] = useState<Registration[]>(() => {
    const stored = localStorage.getItem('registrations');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem('registrations', JSON.stringify(registrations));
  }, [registrations]);

  const addEvent = (event: Omit<Event, 'id'>) => {
    const newEvent = { ...event, id: Date.now().toString() };
    setEvents([...events, newEvent]);
  };

  const updateEvent = (id: string, event: Omit<Event, 'id'>) => {
    setEvents(events.map(e => e.id === id ? { ...event, id } : e));
  };

  const deleteEvent = (id: string) => {
    setEvents(events.filter(e => e.id !== id));
  };

  const addRegistration = (registration: Omit<Registration, 'id' | 'registeredAt' | 'paymentStatus'>) => {
    const newRegistration: Registration = {
      ...registration,
      id: Date.now().toString(),
      registeredAt: new Date().toISOString(),
      paymentStatus: 'Pending'
    };
    setRegistrations([...registrations, newRegistration]);
  };

  return (
    <EventContext.Provider value={{ events, registrations, addEvent, updateEvent, deleteEvent, addRegistration }}>
      {children}
    </EventContext.Provider>
  );
};

export const useEvents = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error('useEvents must be used within EventProvider');
  }
  return context;
};
