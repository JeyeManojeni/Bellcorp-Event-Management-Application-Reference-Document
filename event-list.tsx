'use client';

import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { EventCard } from './event-card';
import type { Event } from '@/lib/types';
import { Search } from 'lucide-react';

type EventListProps = {
  allEvents: Event[];
};

export function EventList({ allEvents }: EventListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [location, setLocation] = useState('all');

  const locations = useMemo(() => ['all', ...Array.from(new Set(allEvents.map(e => e.location)))], [allEvents]);
  const categories = useMemo(() => ['all', ...Array.from(new Set(allEvents.map(e => e.category)))], [allEvents]);

  const filteredEvents = useMemo(() => {
    return allEvents.filter(event => {
      const searchMatch = event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          event.description.toLowerCase().includes(searchTerm.toLowerCase());
      const categoryMatch = category === 'all' || event.category === category;
      const locationMatch = location === 'all' || event.location === location;
      return searchMatch && categoryMatch && locationMatch;
    });
  }, [allEvents, searchTerm, category, location]);

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold font-headline tracking-tight sm:text-5xl lg:text-6xl">
          Discover Events
        </h1>
        <p className="mt-4 text-lg leading-8 text-muted-foreground">
          Browse, search, and filter through our curated list of events.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-lg border bg-card shadow-sm">
        <div className="relative md:col-span-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full"
          />
        </div>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map(cat => (
              <SelectItem key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={location} onValueChange={setLocation}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Filter by location" />
          </SelectTrigger>
          <SelectContent>
            {locations.map(loc => (
              <SelectItem key={loc} value={loc}>{loc.charAt(0).toUpperCase() + loc.slice(1)}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-lg text-muted-foreground">No events found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}
