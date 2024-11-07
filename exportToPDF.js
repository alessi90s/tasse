document.addEventListener("DOMContentLoaded", function () {
    // Aggiunta del pulsante per il download del PDF
    const downloadButton = document.createElement("button");
    downloadButton.textContent = "Scarica Risultati in PDF";
    downloadButton.style.cssText = `
        background-color: #007BFF;
        color: #fff;
        padding: 10px 20px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 16px;
        display: block;
        margin: 20px auto;
    `;
    // Aggiungi il pulsante alla sezione del contenitore principale
    document.querySelector(".calculator-container").appendChild(downloadButton);

    // Listener per il click del pulsante
    downloadButton.addEventListener("click", function () {
        const risultatiDiv = document.getElementById("risultati");

        if (risultatiDiv && risultatiDiv.innerHTML.trim() !== "") {
            // Genera il PDF utilizzando il contenuto HTML esistente
            const options = {
                filename: 'calcolo_regime_forfettario.pdf',
                image: { type: 'jpeg', quality: 1.0 },
                html2canvas: {
                    scale: 2, // Ridimensionamento per migliorare la qualità del PDF
                    useCORS: true // Consente di gestire le risorse esterne con CORS
                },
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
            };

            // Usa html2pdf per generare il PDF dal contenuto HTML
            html2pdf().set(options).from(risultatiDiv).save();
        } else {
            alert("Nessun risultato disponibile per il download.");
        }
    });
});
