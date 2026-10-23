import SiteHeader from '@/components/site/SiteHeader';
import AdaptiveMixer from '@/components/site/AdaptiveMixer';
import WorkReel from '@/components/site/WorkReel';
import SfxShowcase from '@/components/site/SfxShowcase';
import Hero from '@/components/site/Hero';
import AboutSection from '@/components/site/AboutSection';
import ContactFooter from '@/components/site/ContactFooter';
import usePortfolio from '@/lib/usePortfolio';

export default function Home() {
  const { profile, videos, sfx, mix } = usePortfolio();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader profile={profile} />
      <main>
        <Hero profile={profile} />
        <AdaptiveMixer session={mix} />
        <WorkReel videos={videos} />
        <SfxShowcase items={sfx} />
        <AboutSection profile={profile} />
      </main>
      <ContactFooter profile={profile} />
    </div>
  );
}