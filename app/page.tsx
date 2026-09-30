import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Configurator } from '@/components/Configurator';
import { RegionShowcase } from '@/components/RegionShowcase';
import { ProjectGallery } from '@/components/ProjectGallery';
import { RegionFooter } from '@/components/RegionFooter';
import { BrandThemeProvider } from '@/components/BrandTheme';
import { StructuredData } from '@/components/StructuredData';
import { AdvibaFloater } from '@/components/AdvibaFloater';

export default function Page() {
  return (
    <BrandThemeProvider className="min-h-screen bg-canvas">
      <StructuredData />
      <Header />
      <Hero />
      <Configurator />
      <ProjectGallery />
      <RegionShowcase />
      <RegionFooter />
      <AdvibaFloater />
    </BrandThemeProvider>
  );
}
