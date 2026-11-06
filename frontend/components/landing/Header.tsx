"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "./Logo";
import { ThemeToggle } from "../custom/ThemeToggle";

const links = [
  { href: "/#features", label: "Features" },
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#security", label: "Security" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Logo />
        <ul className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="transition-colors hover:text-foreground"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button variant="ghost" className="hidden sm:inline-flex" asChild>
            <Link href="/signin">Log in</Link>
          </Button>
          <Button asChild className="hidden sm:inline-flex">
            <Link href="/#get-started">Get started</Link>
          </Button>
          <button
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border md:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>
      {open && (
        <ul className="space-y-1 border-t px-4 py-3 md:hidden">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                onClick={() => setOpen(false)}
                className="block rounded-md px-3 py-2 text-sm hover:bg-muted"
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li className="pt-2">
            <Button asChild className="w-full">
              <Link href="/#get-started" onClick={() => setOpen(false)}>
                Get started
              </Link>
            </Button>
          </li>
        </ul>
      )}
    </header>
  );
}
