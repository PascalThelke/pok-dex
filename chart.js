function renderChart() {
    const ctx = document.getElementById('statChart');

    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: chartDataLabel,
            datasets: [{
                label: false,
                data: chartDataStats,
                borderWidth: 3
            }]
        },
        options: {
            plugins:{
                legend: {
                 display: false
                }
               },
            scales: {
                r: {
                    angleLines: {
                        display: false
                    },
                    suggestedMin: 0,
                    suggestedMax: 100
                }
            }
        }
    });




}
