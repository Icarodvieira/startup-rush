import { startups } from '../data/database.js';

export function generateRankingTable() {
    // Ordena startups por pontuação (decrescente)
    return [...startups]
        .sort((a, b) => b.score - a.score)
        .map((startup, index) => ({
            posicao: index + 1,
            nome: startup.name,
            pontos: startup.score,
            pitches: startup.stats.pitches,
            bugs: startup.stats.bugs,
            tracoes: startup.stats.tractions,
            investidores: startup.stats.angryInvestors,
            fakeNews: startup.stats.fakeNews
        }));
} 