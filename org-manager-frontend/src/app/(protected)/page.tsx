"use client";

import Link from "next/link";
import { LogOutIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth/auth-context";

export default function HomePage() {
  const { user, logout } = useAuth();

  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col gap-8 px-4 py-10">
      <header className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Connecte en tant que</p>
          <p className="font-medium">{user?.name ?? user?.email}</p>
        </div>
        <Button variant="ghost" size="icon" onClick={() => logout()}>
          <LogOutIcon />
          <span className="sr-only">Deconnexion</span>
        </Button>
      </header>

      <nav className="flex flex-1 flex-col justify-center gap-4">
        <Button asChild size="lg" className="h-20 text-lg">
          <Link href="/org/CFG">CFG</Link>
        </Button>
        <Button asChild size="lg" className="h-20 text-lg" variant="secondary">
          <Link href="/org/COMITE">Comite</Link>
        </Button>
        <Button asChild size="lg" className="h-20 text-lg" variant="outline">
          <Link href="/archives">Archives</Link>
        </Button>
      </nav>
    </main>
  );
}
