'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from './ui/button';
import type { Event, User } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { registerForEvent } from '@/lib/actions';
import { Loader2 } from 'lucide-react';

type RegistrationButtonProps = {
  event: Event;
  user: User | null;
  isRegistered: boolean;
};

export function RegistrationButton({ event, user, isRegistered: initialIsRegistered }: RegistrationButtonProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isRegistered, setIsRegistered] = useState(initialIsRegistered);

  const isSoldOut = event.registered >= event.capacity;
  const isPastEvent = new Date(event.date) < new Date();

  const handleRegister = async () => {
    if (!user) return;
    setIsLoading(true);
    const result = await registerForEvent(event.id, user.id);
    if (result.success) {
      toast({
        title: 'Success!',
        description: result.message,
      });
      setIsRegistered(true);
    } else {
      toast({
        variant: 'destructive',
        title: 'Registration Failed',
        description: result.message,
      });
    }
    setIsLoading(false);
  };
  
  if (isPastEvent) {
    return (
        <Button disabled variant="outline" className="w-full">
          Event has passed
        </Button>
    );
  }

  if (!user) {
    return (
      <Button asChild className="w-full">
        <Link href="/login">Login to Register</Link>
      </Button>
    );
  }

  if (isRegistered) {
    return (
        <Button disabled variant="outline" className="w-full">
            You are registered
        </Button>
    );
  }

  if (isSoldOut) {
    return (
      <Button disabled variant="destructive" className="w-full">
        Sold Out
      </Button>
    );
  }

  return (
    <Button onClick={handleRegister} disabled={isLoading} className="w-full">
      {isLoading ? (
        <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Registering...
        </>
      ) : (
        'Register Now'
      )}
    </Button>
  );
}
