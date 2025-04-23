import { executeRound } from '../services/tournamentService.js';
import { startups } from '../data/database.js';
import { TOURNAMENT, STARTUP } from '../config/constants.js';
import chalk from 'chalk';
import { format } from '../utils/format.js';

export async function executeTournament() {
    try {
        validateTournamentRequirements();
        let activeStartups = startups.filter(startup => startup.active);
        
        while (activeStartups.length > 1) {
            console.log('\n🎯 Nova rodada!');
            
            if(activeStartups.length % 2 !== 0) {
                const topScorer = activeStartups.sort((a, b) => b.score - a.score)[0];
                console.log(`\n⚠️ Nesta rodada teriamos uma quantidade ímpar de startups, então o startup com a maior pontuação passou direto para a final!`);
                console.log(`\n🌟 ${topScorer.name} passou direto para a próxima rodada por ter a maior pontuação (${topScorer.score} pontos)!`);
                
                topScorer.active = false;
                const result = await executeRound();
                if (result === 'back') return;
                
                topScorer.active = true;
                activeStartups = result;
                activeStartups.push(topScorer);
            } else {
                const result = await executeRound();
                if (result === 'back') return;
                activeStartups = result;
            }
        }
        
        if (activeStartups.length === 1) {
            format.clear();
            const champion = activeStartups[0];
            console.log('\n🏆🏆🏆 CAMPEÃO DO STARTUP RUSH! 🏆🏆🏆');
            console.log(`Parabéns ${champion.name} (${champion.score} pts)!`);
            console.log(chalk.bold.green(`${champion.slogan}`));
        }
    } catch(error) {
        console.error('❌ Erro no torneio:', error.message);
    }
}

export function validateTournamentRequirements() {
    if (startups.length < TOURNAMENT.MIN_STARTUPS) {
        throw new Error(`É necessário cadastrar pelo menos ${TOURNAMENT.MIN_STARTUPS} startups para iniciar o torneio. Atual: ${startups.length}`);
    }
    if(startups.length % 2 !== 0){
        throw new Error(`A quantidade de startups deve ser par para formar as batalhas. Atual: ${startups.length}`);
    }
} 

export function resetTournament() {
    startups.forEach(startup => {
        startup.active = true;
        startup.score = STARTUP.INITIAL_SCORE;
        startup.stats = {
            ...STARTUP.INITIAL_STATS
        };
    });
    format.clear();
    console.log('🔄 Dados do torneio reiniciados com sucesso!');
}
