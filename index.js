import inquirer from 'inquirer';
import { createStartup, listStartups } from './controllers/startupController.js';
import { executeTournament, resetTournament } from './controllers/tournamentController.js';
import { displayRankingTable } from './views/reportView.js';
import { generateRankingTable } from './services/reportService.js';

async function main() {
    while (true) {
        const { action } = await inquirer.prompt([
            {
                type: 'list',
                name: 'action',
                message: 'O que você deseja fazer?',
                choices: [
                    { name: 'Iniciar torneio', value: 'tournament' },
                    { name: 'Cadastrar nova startup', value: 'create' },
                    { name: 'Listar startups', value: 'list' },
                    { name: 'Relatório', value: 'report' },
                    { name: 'Reiniciar torneio', value: 'reset' },
                    { name: 'Sair', value: 'exit' }
                ]
            }
        ]);

        switch (action) {
            case 'create':
                await createStartup();
                break;
            case 'list':
                await listStartups();
                break;
            case 'tournament':
                await executeTournament();
                break;
            case 'report':
                displayRankingTable(generateRankingTable());
                break;
            case 'exit':
                console.log('👋 Até logo!');
                return;
            case 'reset':
                resetTournament();
                break;
        }
    }
}

main().catch(console.error);
