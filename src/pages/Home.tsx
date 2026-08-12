import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Skills } from '@/components/sections/Skills';
import { Projects } from '@/components/sections/Projects';
import { GitHubStats } from '@/components/sections/GitHubStats';
import { FunSection } from '@/components/sections/FunSection';
import { Contact } from '@/components/sections/Contact';
import { Footer } from '@/components/layout/Footer';

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background overflow-x-hidden">
      <Hero />
      <About />
      <Skills />
      <Projects />
      <GitHubStats />
      <FunSection />
      <Contact />
      <Footer />
    </main>
  );
}
