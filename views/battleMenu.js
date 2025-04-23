import inquirer from 'inquirer';

export async function showBattleMenu(battles) {

    const { selectedBattle } = await inquirer.prompt([
        {
            type: 'list',
            name: 'selectedBattle',
            message: 'Escolha uma batalha para administrar:',
            choices: [
                ...battles.map((battle, index) => ({
                    name: `Batalha ${index + 1}: ${battle[0].name} vs ${battle[1].name}`,
                    value: battle
                })),
                new inquirer.Separator(),
                { name: 'Voltar ao menu principal', value: 'back' }
            ]
        }
    ]);

    return selectedBattle;
}