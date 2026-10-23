// Portfolio content is maintained locally for the standalone site.
export const sampleProfile = {
  name: 'Jacob Paulson',
  role_line: 'Sound Designer — Adaptive Audio & Game SFX',
  headline: 'Sound that answers to the player.',
  intro:
    'I design adaptive audio systems and combat sound for games. Layered mixes that re-voice themselves with game state, and impacts that land with weight.',
  about:
    'As a musician and Berklee College of Music graduate, music has always impacted my experiences. But music that dynamically responds to player choices is where game music becomes magic. I design adaptive music systems and high quality sound design assets. Focusing on easily implementable solutions, I build cues as systems — stems, states and transitions — so the player experience is always dynamic.',
  location: 'Los Angeles, CA',
  email: 'jrpgaudio@gmail.com',
  about_photo_url: 'public/media/ProfilePic.JPG',
  links: [],
  resume_url: null,
};

export const sampleVideos = [
  {
    id: 'v1',
    title: 'Starchild - End to End Solo Development',
    category: 'Web Game',
    engine: 'Unity',
    duration: '2:14',
    description:
      'Taking a game jam game to a full web release: music, SFX, implementation and optimization.',
    media_url: 'https://res.cloudinary.com/vtpqn10m/video/upload/v1792789120/StarchildReelDemo.mp4',
 
    poster_url: null,
  },
  {
    id: 'v2',
    title: 'Wwise Implementation into Unreal Engine',
    category: 'Dynamic music and sound design',
    engine: 'Unreal',
    duration: '1:38',
    description:
      'Coursework implementing Wwise into Unreal Engine, including music and SFX.',
    media_url:
      'https://res.cloudinary.com/vtpqn10m/video/upload/v1792789133/WwiseDemoReel.mp4',
    poster_url: null,
  },
  {
    id: 'v3',
    title: 'Whirligig - Combat SFX and Adaptive Music',
    category: 'Game Jam',
    engine: 'Unity',
    duration: '3:02',
    description:
      'End to end solo development for Juniper Devs Serious Game Jam - combat SFX, adaptive music, and implementation.',
    media_url:
      'https://res.cloudinary.com/vtpqn10m/video/upload/v1792789127/WhirligigReel.mp4',
    poster_url: null,
  },
];

export const sampleSfx = [
  {
    id: 's1',
    title: 'Menu Theme - Shass',
    category: 'Main Menu Music',
    duration: '2:24',
    detail: 'Overworld theme for 2.5D infected scifi tag game',
    audio_url:
      'https://res.cloudinary.com/vtpqn10m/video/upload/v1792788176/Shass_MenuTheme_15SecDrop.wav',
  },
  {
    id: 's2',
    title: 'Vegas Lament - Vangaurd(Unpublished)',
    category: 'Cinematic Music Scifi Game',
    duration: '3:56',
    detail: 'Mech transient · shell · handling',
    audio_url:
      'https://res.cloudinary.com/vtpqn10m/video/upload/v1792788185/Vega_s_Lament.mp3',
  },
  {
    id: 's3',
    title: 'Stellar Run - Shass Runner Theme',
    category: 'Adaptive Layering Music',
    duration: '0:30',
    detail: 'Pulsing synths · arpeggios · bass · percussion Layered for adaptive playback',
    audio_url:
      'https://res.cloudinary.com/vtpqn10m/video/upload/v1792788198/Shass_StellarRun_1_L.wav',
  },
];

export const sampleMix = {
  id: 'm1',
  title: 'Adaptive Exploration — “Ice Caves”',
  description:
    'Four Layers, one transport. Push the faders and the same cue re-voices for game state.',
  scene_url: null,
  stems: [
    {
      id: 's1',
      label: 'Atmosphere',
      hint: 'Horns · pads · bells',
      default_level: 0.8,
      audio_url: '/media/IceCaves_Layer 1.mp3',
    },
    {
      id: 's2',
      label: 'Pulse',
      hint: 'Counter Melody · bells',
      default_level: 0.35,
      audio_url: '/media/IceCaves_Layer 2.mp3',
    },
    {
      id: 's3',
      label: 'Discovery',
      hint: 'Strings swell',
      default_level: 0.2,
      audio_url: '/media/IceCaves_Layer 3.mp3',
    },
    {
      id: 's4',
      label: 'Intensity',
      hint: 'Drums · percussion',
      default_level: 0.1,
      audio_url: '/media/IceCaves_Layer 4.mp3',
    },
  ],
  presets: [
    {
      id: 'exploration',
      label: 'Exploration',
      levels: { s1: 0.88, s2: 0.5, s3: 0.04, s4: 0.00 },
    },
    {
      id: 'meloncholy',
      label: 'Meloncholy',
      levels: { s1: 0.00, s2: 0.80, s3: 0.00, s4: 0.00 },
    },
    {
      id: 'tension',
      label: 'Tension',
      levels: { s1: 0.8, s2: 0.8, s3: 0.8, s4: 0.00 },
    },
    {
      id: 'escape',
      label: 'Escape',
      levels: { s1: 0.9, s2: 0.9, s3: 0.9, s4: 0.89 },
    },
  ],
};