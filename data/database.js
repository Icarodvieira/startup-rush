import { STARTUP } from '../config/constants.js';

export const startups = [
    {
      name: 'InovaMind',
      slogan: 'Transformando ideias em inovação',
      yearFundation: '2018',
      score: STARTUP.INITIAL_SCORE,
      active: true,
      stats: { ...STARTUP.INITIAL_STATS }
    },
    {
      name: 'GreenPulse',
      slogan: 'Tecnologia sustentável para um futuro melhor',
      yearFundation: '2020',
      score: STARTUP.INITIAL_SCORE,
      active: true,
      stats: { ...STARTUP.INITIAL_STATS }
    },
    {
      name: 'ByteNest',
      slogan: 'Onde a inovação encontra o código',
      yearFundation: '2016',
      score: STARTUP.INITIAL_SCORE,
      active: true,
      stats: { ...STARTUP.INITIAL_STATS }
    },
    {
      name: 'UrbanHive',
      slogan: 'Conectando pessoas e cidades inteligentes',
      yearFundation: '2019',
      score: STARTUP.INITIAL_SCORE,
      active: true,
      stats: { ...STARTUP.INITIAL_STATS }
    }
  ];
  