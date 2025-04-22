import { promptStartupData } from '../views/startupForm.js';
import { startups } from '../data/database.js';

export async function createStartup() {
    try {
        if(startups.length >= 8){
            throw new Error(`❌ Limite máximo de 8 participantes atingido.`);
        }
        const startup = await promptStartupData();
        startups.push(startup);
        console.log('\n✅ Startup criada com sucesso!');
    } catch(error) {
        console.log(error.message);
    }
}

export async function listStartups() {
    console.log(startups);
}