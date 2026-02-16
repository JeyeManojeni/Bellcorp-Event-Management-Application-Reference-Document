import Link from 'next/link';
import { UserNav } from './user-nav';
import { getUser } from '@/lib/auth';
import { Sparkles } from 'lucide-react';

export async function SiteHeader() {
  const user = await getUser();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <Link href="/events" className="mr-6 flex items-center space-x-2">
          <Sparkles className="h-6 w-6 text-primary" />
          <span className="font-bold font-headline sm:inline-block text-lg">
            EventFlow
          </span>
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          <Link
            href="/events"
            className="transition-colors hover:text-foreground/80 text-foreground/60"
          >
            Events
          </Link>
          <Link
            href="/dashboard"
            className="transition-colors hover:text-foreground/80 text-foreground/60"
          >
            Dashboard
          </Link>
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <UserNav user={user} />
        </div>
      </div>
    </header>
  );
}
