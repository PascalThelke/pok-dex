function renderChart() {
    const ctx = document.getElementById('statChart');
    const backgroundOpacity = 0.5; 
    const rgbaBackgroundColor = getRGBAColor('light' + backgroundColor, backgroundOpacity);

    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: chartDataLabel,
            datasets: [{
                label: false,
                data: chartDataStats,
                borderWidth: 2,
                fill: true,
                backgroundColor: rgbaBackgroundColor,
                borderColor: backgroundColor,
                pointBackgroundColor: backgroundColor,
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
// Funktion welche ein Canvas mit der gewünschten Fargbe erstellt und die Pixelfarbwerte ausließt und die Farbe so in ein rgba code umwandelt
function getRGBAColor(colorName, alpha) {
    // Ein Canvas-Element erstellen, um Pixelwerte zu extrahieren
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    // 2D-Kontext des Canvas holen
    const ctx = canvas.getContext('2d');
    // Die gewünschte Farbe als Füllfarbe für das Canvas setzen
    ctx.fillStyle = colorName;
    // Ein einzelnes Pixel auf dem Canvas zeichnen
    ctx.fillRect(0, 0, 1, 1);
    // Pixelwerte auslesen (RGBA-Werte im Bereich von 0 bis 255)
    const pixel = ctx.getImageData(0, 0, 1, 1).data;
    // RGBA-Code zusammenstellen und optional die Opazität anpassen
    const rgba = `rgba(${pixel[0]}, ${pixel[1]}, ${pixel[2]}, ${alpha !== undefined ? alpha : pixel[3] / 255})`;
    // Den resultierenden RGBA-Code zurückgeben
    return rgba;
}