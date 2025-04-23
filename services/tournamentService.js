import { startups } from '../data/database.js';
import { TOURNAMENT } from '../config/constants.js';
import { showBattleMenu } from '../views/battleMenu.js';
import { showEventSelection, showStartupSelection } from '../views/battleView.js';
import { format } from '../utils/format.js';

export function createRoundBattles() {
  const activeStartups = startups.filter(startup => startup.active);
  const shuffledStartups = activeStartups.slice().sort(() => Math.random() - 0.5);
  const battles = [];

  for (let i = 0; i < shuffledStartups.length; i += 2) {
    battles.push([shuffledStartups[i], shuffledStartups[i + 1]]);
  }

  return battles;
}

export async function executeRound() {
  try {
    const battles = createRoundBattles();
    
    while (battles.length > 0) {
      const selectedBattle = await showBattleMenu(battles);
      
      if (selectedBattle === 'back') {
        return 'back';
      }
      
      await executeBattle(selectedBattle[0], selectedBattle[1]);
      
      const battleIndex = battles.findIndex(battle => 
        battle[0] === selectedBattle[0] && battle[1] === selectedBattle[1]
      );
      if (battleIndex !== -1) {
        battles.splice(battleIndex, 1);
      }
    }
    
    return startups.filter(startup => startup.active);
  } catch(error) {
    console.error(format.error(error.message));
  }
}

export async function executeBattle(startup1, startup2) {
  if (!startup1.active || !startup2.active) {
    throw new Error('Uma das startups não está ativa para batalha');
  }
  
  format.clear();
  console.log(format.battle(`Batalha: ${startup1.name} vs ${startup2.name}`));
  console.log(format.score(`Pontuação inicial: ${startup1.name}: ${startup1.score} | ${startup2.name}: ${startup2.score}\n`));
  
  const usedEventsStartup1 = new Set();
  const usedEventsStartup2 = new Set();
  
  while (true) {
    const eventType = await showEventSelection();
    if (!eventType) break;
    
    if (usedEventsStartup1.has(eventType.name) && usedEventsStartup2.has(eventType.name)) {
      console.log(format.error('Este evento já foi usado em ambas as startups!'));
      continue;
    }
    
    const startup = await showStartupSelection(startup1, startup2);
    const usedEvents = startup === startup1 ? usedEventsStartup1 : usedEventsStartup2;
    
    if(usedEvents.has(eventType.name)){
      console.log(format.error('Este evento já foi usado nesta startup!'));
      continue;
    }
    
    usedEvents.add(eventType.name);
    applyEvent(startup, eventType);
    format.clear();
    console.log(format.battle(`Batalha: ${startup1.name} vs ${startup2.name}`));
    console.log(format.event(`Evento aplicado: ${eventType.name} para ${startup.name}`));
    console.log(format.score(`Pontuação atual: ${startup1.name}: ${startup1.score} | ${startup2.name}: ${startup2.score}\n`));
  }
  
  resolveBattle(startup1, startup2);
}

function resolveBattle(startup1, startup2) {
  let winner;
  let loser;
  
  if (startup1.score > startup2.score) {
    winner = startup1;
    loser = startup2;
  } else if (startup2.score > startup1.score) {
    winner = startup2;
    loser = startup1;
  } else {
    console.log(format.sharkFight('Shark Fight! Empate detectado!'));
    const randomStartup = Math.random() < 0.5 ? startup1 : startup2;
    randomStartup.score += TOURNAMENT.SHARK_FIGHT_BONUS;
    winner = randomStartup;
    loser = randomStartup === startup1 ? startup2 : startup1;
    console.log(format.info(`${winner.name} recebeu +${TOURNAMENT.SHARK_FIGHT_BONUS} pontos por vencer o Shark Fight!`));
  }
  
  
  winner.score += TOURNAMENT.VICTORY_BONUS;
  console.log(format.winner(`Vencedor: ${winner.name} com ${winner.score} pontos!`));
  console.log(format.info(`${winner.name} recebeu +${TOURNAMENT.VICTORY_BONUS} pontos!`));
  loser.active = false;
  console.log(format.info(`${loser.name} foi eliminado!`));
}

export function applyEvent(startup, event) {
  switch(event.name) {
    case 'Pitch convincente':
      startup.stats.pitches++;
      break;
    case 'Produto com bugs':
      startup.stats.bugs++;
      break;
    case 'Boa tração de usuários':
      startup.stats.tractions++;
      break;
    case 'Investidor irritado':
      startup.stats.angryInvestors++;
      break;
    case 'Fake news no pitch':
      startup.stats.fakeNews++;
      break;
  }
  startup.score += event.points;
}