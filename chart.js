function renderChart() {
    const ctx = document.getElementById('statChart');
   

    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: chartDataLabel,
            datasets: [{
                label: false,
                data: chartDataStats,
                borderWidth: 2,
                fill: true,
                backgroundColor: getPokemonTypeColorWithOpacity(backgroundColor),
                borderColor: getPokemonTypeBorderColor(backgroundColor),
                pointBackgroundColor: getPokemonTypeBorderColor(backgroundColor),
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgb(54, 162, 235)'
            }]
        },
        options: {
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                r: {
                    angleLines: {
                        color: 'black',
                    },
                    grid: {
                        color: 'black'
                    },
                    pointLabels: {
                        font: {
                          size: 16,
                          weight: 'bold'
                        }
                    },
                    suggestedMin: 0,
                    suggestedMax: 105
                }
            }
        }
    });
}


function getPokemonTypeColor(type) {
    switch(type.toLowerCase()) {
        case 'fire':
            return '#CD5C5C'; // Fire
        case 'water':
            return '#4F94CD'; // Water
        case 'grass':
            return '#71C671'; // Grass
        case 'electric':
            return '#FFD700'; // Electric
        case 'ice':
            return '#87CEEB'; // Ice
        case 'fighting':
            return '#A05252'; // Fighting
        case 'poison':
            return '#8A2BE2'; // Poison
        case 'ground':
            return '#CD853F'; // Ground
        case 'flying':
            return '#ADD8E6'; // Flying
        case 'psychic':
            return '#FF69B4'; // Psychic
        case 'bug':
            return '#9ACD32'; // Bug
        case 'rock':
            return '#C0C0C0'; // Rock
        case 'ghost':
            return '#8B008B'; // Ghost
        case 'dark':
            return '#2E2E2E'; // Dark
        case 'steel':
            return '#A9A9A9'; // Steel
        case 'fairy':
            return '#FFB6C1'; // Fairy
        case 'dragon':
            return '#7038F8'; // Dragon
        default:
            return '#8A8A80'; // Normal, falls kein entsprechender Typ gefunden wird
    }
}

function getPokemonTypeColorWithOpacity(type) {
    switch(type.toLowerCase()) {
        case 'fire':
            return 'rgba(205, 92, 92, 0.5)'; // Fire
        case 'water':
            return 'rgba(79, 148, 205, 0.5)'; // Water
        case 'grass':
            return 'rgba(113, 198, 113, 0.5)'; // Grass
        case 'electric':
            return 'rgba(255, 215, 0, 0.5)'; // Electric
        case 'ice':
            return 'rgba(135, 206, 235, 0.5)'; // Ice
        case 'fighting':
            return 'rgba(160, 82, 82, 0.5)'; // Fighting
        case 'poison':
            return 'rgba(138, 43, 226, 0.5)'; // Poison
        case 'ground':
            return 'rgba(205, 133, 63, 0.5)'; // Ground
        case 'flying':
            return 'rgba(173, 216, 230, 0.5)'; // Flying
        case 'psychic':
            return 'rgba(255, 105, 180, 0.5)'; // Psychic
        case 'bug':
            return 'rgba(154, 205, 50, 0.5)'; // Bug
        case 'rock':
            return 'rgba(192, 192, 192, 0.5)'; // Rock
        case 'ghost':
            return 'rgba(139, 0, 139, 0.5)'; // Ghost
        case 'dark':
            return 'rgba(46, 46, 46, 0.5)'; // Dark
        case 'steel':
            return 'rgba(169, 169, 169, 0.5)'; // Steel
        case 'fairy':
            return 'rgba(255, 182, 193, 0.5)'; // Fairy
        case 'dragon':
            return 'rgba(112, 56, 248, 0.5)'; // Dragon
        default:
            return 'rgba(138, 138, 128, 0.5)'; // Normal, falls kein entsprechender Typ gefunden wird
    }
}

function getPokemonTypeBorderColor(type) {
    switch(type.toLowerCase()) {
        case 'fire':
            return '#8B0000'; // Fire
        case 'water':
            return '#1E90FF'; // Water (Dunkelblau)
        case 'grass':
            return '#556B2F'; // Grass
        case 'electric':
            return '#B8860B'; // Electric
        case 'ice':
            return '#4169E1'; // Ice
        case 'fighting':
            return '#800000'; // Fighting
        case 'poison':
            return '#9400D3'; // Poison
        case 'ground':
            return '#8B4513'; // Ground
        case 'flying':
            return '#4682B4'; // Flying
        case 'psychic':
            return '#8B008B'; // Psychic
        case 'bug':
            return '#228B22'; // Bug
        case 'rock':
            return '#696969'; // Rock
        case 'ghost':
            return '#4B0082'; // Ghost
        case 'dark':
            return '#2F4F4F'; // Dark
        case 'steel':
            return '#808080'; // Steel
        case 'fairy':
            return '#FF69B4'; // Fairy
        case 'dragon':
            return '#8A2BE2'; // Dragon
        default:
            return '#696969'; // Normal, falls kein entsprechender Typ gefunden wird
    }
}