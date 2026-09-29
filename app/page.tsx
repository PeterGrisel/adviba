import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Configurator } from '@/components/Configurator';
import { RegionShowcase } from '@/components/RegionShowcase';
import { RegionFooter } from '@/components/RegionFooter';
import { BrandThemeProvider } from '@/components/BrandTheme';

export default function Page() {
  return (
    <BrandThemeProvider className="min-h-screen bg-canvas">
      <Header />
      <Hero />
      <Configurator />
      <RegionShowcase />
      <RegionFooter />
    </BrandThemeProvider>
  );
}
