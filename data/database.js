import { STARTUP, TOURNAMENT } from '../config/constants.js';

export const startups = [
    { 
        name: 'lebes', 
        slogan: 'Na lebes você pode', 
        yearFundation: '1930',
        score: TOURNAMENT.INITIAL_SCORE,
        active: true,
        stats: { ...STARTUP.INITIAL_STATS }
    }, 
    { 
        name: 'panvel', 
        slogan: 'Quem não sabe', 
        yearFundation: '1970',
        score: TOURNAMENT.INITIAL_SCORE,
        active: true,
        stats: { ...STARTUP.INITIAL_STATS }
    },
    { 
        name: 'dell', 
        slogan: 'O poder de fazer mais', 
        yearFundation: '1956',
        score: TOURNAMENT.INITIAL_SCORE,
        active: true,
        stats: { ...STARTUP.INITIAL_STATS }
    },
    { 
        name: 'appmax', 
        slogan: 'É os guri do aplicativo', 
        yearFundation: '2007',
        score: TOURNAMENT.INITIAL_SCORE,
        active: true,
        stats: { ...STARTUP.INITIAL_STATS }
    }
];