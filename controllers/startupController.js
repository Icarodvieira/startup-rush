import { promptStartupData } from '../views/startupForm.js';
import { startups } from '../data/database.js';
import { Table } from 'console-table-printer';
import { format } from '../utils/format.js';

export async function createStartup() {
    try {
        if(startups.length >= 8){
            throw new Error(`❌ Limite máximo de 8 participantes atingido.`);
        }
        
        const { startup, action } = await promptStartupData();
        startups.push(startup);
        
        if (action === 'create') {
            await createStartup();
        }
    } catch(error) {
        console.log(error.message);
    }
}

export async function listStartups() {
    console.log('\nStartups cadastradas:\n');
    
    const table = new Table({
        columns: [
            { name: 'nome', title: 'Nome', alignment: 'left'},
            { name: 'slogan', title: 'Slogan', alignment: 'left'},
            { name: 'ano', title: 'Ano', alignment: 'center'},
            { name: 'pontos', title: 'Pontos', alignment: 'center'},
            { name: 'status', title: 'Status', alignment: 'center' }
        ]
    });

    startups.forEach(startup => {
        table.addRow({
            nome: startup.name,
            slogan: startup.slogan,
            ano: startup.yearFundation,
            pontos: startup.score,
            status: startup.active ? '✅ Ativo' : '❌ Eliminado'
        });
    });

    table.printTable();
    console.log(`\n📊 Total de startups: ${startups.length}`);
    console.log(`🎯 Startups ativas: ${startups.filter(s => s.active).length}`);
}