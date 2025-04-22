import { tournamentInit, executeBattle } from '../services/tournamentService.js';
import { startups } from '../data/database.js';
import { showBattleMenu } from '../views/battleMenu.js';
import { TOURNAMENT } from '../config/constants.js';

export async function startTournament() {
    try {
        validateTournamentRequirements();
        const battles = tournamentInit();
        
        while (battles.length > 0) {
            const selectedBattle = await showBattleMenu(battles);
            const winner = await executeBattle(selectedBattle[0], selectedBattle[1]);
            
            const battleIndex = battles.findIndex(battle => 
                battle[0] === selectedBattle[0] && battle[1] === selectedBattle[1]
            );
            if (battleIndex !== -1) {
                battles.splice(battleIndex, 1);
            }
        }

        const activeStartups = startups.filter(startup => startup.active);

        if (activeStartups.length > 1) {
            console.log('\n🎯 Próxima rodada!');
            await startTournament();
        } else {
            const champion = activeStartups[0];
            console.log('\n🏆🏆🏆 CAMPEÃO DO STARTUP RUSH! 🏆🏆🏆');
            console.log(`Parabéns ${champion.name}!`);
            console.log(`Slogan: ${champion.slogan}`);
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
