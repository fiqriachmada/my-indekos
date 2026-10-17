import { AboutHero } from "./_components/about-hero";
import { AboutValues } from "./_components/about-values";

export const metadata = {
  title: "About Us — My Indekos",
  description:
    "Learn more about the vision, mission, and team behind the My Indekos integrated boarding house management platform.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors">
      <main>
        <AboutHero />
        <AboutValues />
      </main>
    </div>
  );
}
