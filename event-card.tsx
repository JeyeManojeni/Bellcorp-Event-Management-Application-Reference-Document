import Link from 'next/link';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from './badge';
import type { Event } from '@/lib/types';
import { Calendar, MapPin } from 'lucide-react';
import { format } from 'date-fns';

type EventCardProps = {
  event: Event;
};

export function EventCard({ event }: EventCardProps) {
  const isSoldOut = event.registered >= event.capacity;

  return (
    <Link href={`/events/${event.id}`} className="group">
      <Card className="h-full flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
        <CardHeader className="p-0 relative">
          <Image
            src={event.image}
            alt={event.name}
            width={600}
            height={400}
            className="w-full h-48 object-cover"
            data-ai-hint="event image"
          />
          {isSoldOut && (
             <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                <span className="text-white font-bold text-xl tracking-wider">SOLD OUT</span>
            </div>
          )}
        </CardHeader>
        <CardContent className="flex-grow p-4">
          <Badge variant="secondary" className="mb-2">{event.category}</Badge>
          <CardTitle className="text-xl font-headline leading-tight group-hover:text-primary transition-colors">
            {event.name}
          </CardTitle>
        </CardContent>
        <CardFooter className="p-4 bg-muted/50 flex flex-col items-start gap-2 text-sm text-muted-foreground">
           <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{format(new Date(event.date), 'EEE, MMM d, yyyy')}</span>
           </div>
           <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>{event.location}</span>
           </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
