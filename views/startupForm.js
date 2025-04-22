import inquirer from 'inquirer';
import { STARTUP, VALIDATION } from '../config/constants.js';

export async function promptStartupData() {
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Nome:',
      validate: (input) => {
        if (!input.trim()) {
          return 'O nome não pode estar vazio';
        }else if(input.trim().length > 30){
          return 'O nome deve ter no máximo 30 caracteres';
        }
        return true;
      }
    },
    {
      type: 'input',
      name: 'slogan',
      message: 'Slogan:',
      validate: (input) => {
        if (!input.trim()) {
          return 'O slogan não pode estar vazio';
        }else if(input.trim().length < 3 || input.trim().length > 30){
          return 'O slogan deve ter entre 3 e 30 caracteres';
        }
        return true;
      }
    },
    {
      type: 'input',
      name: 'yearFundation',
      message: 'Ano de fundação:',
      validate: (input) => {
        
        if (!/^\d+$/.test(input)) {
            return 'Por favor, insira apenas números';
        }
        const year = parseInt(input.trim());
        if (year < VALIDATION.MIN_YEAR || year > VALIDATION.MAX_YEAR) {
            return `O ano deve estar entre ${VALIDATION.MIN_YEAR} e ${VALIDATION.MAX_YEAR}`;
        }
        return true;
      }
    }
  ]);

  return {
    name: answers.name.trim(),
    slogan: answers.slogan.trim(),
    yearFundation: answers.yearFundation,
    score: STARTUP.INITIAL_SCORE,
    active: true,
    stats: { ...STARTUP.INITIAL_STATS }
  };
}
