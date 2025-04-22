import { Table } from 'console-table-printer';

export function displayRankingTable(tableData) {
    console.log('\n🏆 RANKING FINAL DAS STARTUPS\n');
    
    const table = new Table({
        columns: [
            { name: 'posicao', title: 'Posição', alignment: 'center' },
            { name: 'nome', title: 'Nome', alignment: 'left' },
            { name: 'pontos', title: 'Pontos', alignment: 'center' },
            { name: 'pitches', title: 'Pitches', alignment: 'center' },
            { name: 'bugs', title: 'Bugs', alignment: 'center' },
            { name: 'tracoes', title: 'Trações', alignment: 'center' },
            { name: 'investidores', title: 'Investidores', alignment: 'center' },
            { name: 'fakeNews', title: 'Fake News', alignment: 'center' }
        ]
    });

    tableData.forEach(startup => {
        table.addRow(startup);
    });

    table.printTable();
} 