import chalk from 'chalk';

export const format = {
    error: (text) => chalk.red(`❌ ${text}`),
    battle: (text) => chalk.magenta(`⚔️  ${text}`),
    score: (text) => chalk.cyan(`📊 ${text}`),
    event: (text) => chalk.green(`🎯 ${text}`),
    winner: (text) => chalk.bold.green(`🏆 ${text}`),
    sharkFight: (text) => chalk.bold.red(`🦈 ${text}`),
    info: (text) => chalk.blue(`ℹ️  ${text}`),
    clear: () => console.clear()
}; 