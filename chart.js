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
                backgroundColor: 'rgba(54, 162, 235, 0.4)',
                borderColor: 'rgb(54, 162, 235)',
                pointBackgroundColor: 'rgb(54, 162, 235)',
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
                        color: 'black', // Farbe der radialen Linien (Hintergrundgitter)
                    },
                    grid: {
                        color: 'black' // Farbe der Gitterlinien zwischen den Grundlinien (Ticks)
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
