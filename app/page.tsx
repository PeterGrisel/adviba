import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Configurator } from '@/components/Configurator';
import { RegionShowcase } from '@/components/RegionShowcase';
import { RegionFooter } from '@/components/RegionFooter';

export default function Page() {
  return (
    <main className="min-h-screen bg-canvas">
      <Header />
      <Hero />
      <Configurator />
      <RegionShowcase />
      <RegionFooter />
    </main>
  );
}
