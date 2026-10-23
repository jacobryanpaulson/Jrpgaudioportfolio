import { sampleMix, sampleProfile, sampleSfx, sampleVideos } from '@/data/sampleContent';

export default function usePortfolio() {
  return {
    profile: sampleProfile,
    videos: sampleVideos,
    sfx: sampleSfx,
    mix: sampleMix,
  };
}