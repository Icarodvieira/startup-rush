import inquirer from 'inquirer';
import { EVENTS } from '../config/events.js';

export async function showEventSelection() {
    const events = Object.values(EVENTS);
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

    return eventType;
}

export async function showStartupSelection(startup1, startup2) {
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

    return startup;
}
