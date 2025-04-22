import { startups } from '../data/database.js';
import { EVENTS } from '../config/events.js';
import { TOURNAMENT } from '../config/constants.js';
import inquirer from 'inquirer';

export function tournamentInit() { // Embaralha as startups e cria as batalhas (em duplas)
  const activeStartups = startups.filter(startup => startup.active);
  const shuffledStartups = activeStartups.slice().sort(() => Math.random() - 0.5);
  const battles = [];

  for (let i = 0; i < shuffledStartups.length; i += 2) {
    battles.push([shuffledStartups[i], shuffledStartups[i + 1]]);
  }

  return battles;
}

export async function executeBattle(startup1, startup2) {
  if (!startup1.active || !startup2.active) {
    throw new Error('Uma das startups não está ativa para batalha');
  }

  console.log(`\n⚔️ Batalha: ${startup1.name} vs ${startup2.name}`);
  console.log(`Pontuação inicial: ${startup1.name}: ${startup1.score} | ${startup2.name}: ${startup2.score} \n`);

  const events = Object.values(EVENTS);
  const usedEventsStartup1 = new Set();
  const usedEventsStartup2 = new Set();

  while (true) {
    const { eventType } = await inquirer.prompt([
      {
        type: 'list',
        name: 'eventType',
        message: 'Selecione um evento ou finalize a batalha:',
        choices: [
          ...events.map(event => ({
            name: `${event.name} (${event.points > 0 ? '+' : ''}${event.points} pontos)`,
            value: event
          })),
          new inquirer.Separator(),
          { name: 'Finalizar batalha', value: null }
        ]
      }
    ]);

    if (!eventType) break;

    if (usedEventsStartup1.has(eventType.name) && usedEventsStartup2.has(eventType.name)) {
      console.log('❌ Este evento já foi usado em ambas as startups!');
      continue;
    }

    const { startup } = await inquirer.prompt([
      {
        type: 'list',
        name: 'startup',
        message: 'Para qual startup aplicar o evento?',
        choices: [
          { name: startup1.name, value: startup1 },
          { name: startup2.name, value: startup2 }
        ]
      }
    ]);

    // Verifica se a startup já recebeu este evento
    const usedEvents = startup === startup1 ? usedEventsStartup1 : usedEventsStartup2;
    if(usedEvents.has(eventType.name)){
      console.log('❌ Este evento já foi usado nesta startup!');
      continue;
    }
    usedEvents.add(eventType.name);

    // Incrementa o contador de estatísticas apropriado
    switch(eventType.name) {
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

    startup.score += eventType.points;
    console.log(`\n✅ Evento aplicado: ${eventType.name} para ${startup.name}`);
    console.log(`Pontuação atual: ${startup1.name}: ${startup1.score} | ${startup2.name}: ${startup2.score}\n`);
  }

  let winner;
  let loser;
  if (startup1.score > startup2.score) {
    winner = startup1;
    loser = startup2;
  } else if (startup2.score > startup1.score) {
    winner = startup2;
    loser = startup1;
  } else {
    console.log('\n🦈 Shark Fight! Empate detectado!');
    const randomBonus = Math.random() < 0.5 ? startup1 : startup2;
    randomBonus.score += TOURNAMENT.SHARK_FIGHT_BONUS;
    winner = randomBonus;
    loser = randomBonus === startup1 ? startup2 : startup1;
    console.log(`${randomBonus.name} recebeu +${TOURNAMENT.SHARK_FIGHT_BONUS} pontos!`);
  }

  loser.active = false;
  winner.score += TOURNAMENT.VICTORY_BONUS;
  console.log(`\n🏆 Vencedor: ${winner.name} com ${winner.score} pontos!`);
  return winner;
}
