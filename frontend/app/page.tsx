import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { Security } from "@/components/landing/Security";
import { CallToAction } from "@/components/landing/CallToAction";
import { Footer } from "@/components/landing/Footer";
import { HowItWorks } from "@/components/landing/HowItWorks";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SpendWise — Personal Finance & Expense Tracking",
  description:
    "Record income and expenses, set monthly category budgets, and understand your spending with clear reports.",
  openGraph: {
    title: "SpendWise — Personal Finance & Expense Tracking",
    description:
      "Track spending, set budgets, and see where your money goes with SpendWise.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Security />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
}
