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
    document.querySelector(".calculator-container").appendChild(downloadButton);

    // Listener per il click del pulsante
    downloadButton.addEventListener("click", function () {
        console.log("Pulsante cliccato - Generazione PDF in corso...");

        const risultatiDiv = document.getElementById("risultati");

        if (risultatiDiv && risultatiDiv.innerHTML.trim() !== "") {
            console.log("Risultati trovati, inizio la generazione del PDF...");

            // Opzioni per migliorare la qualità del PDF
            const options = {
                margin: [10, 10, 10, 10],
                filename: 'calcolo_regime_forfettario.pdf',
                image: { type: 'jpeg', quality: 1.0 },
                html2canvas: {
                    scale: 2, // Ridimensionamento per migliorare la qualità del PDF
                    useCORS: true, // Consente di gestire le risorse esterne con CORS
                    logging: true // Mostra log per il debug
                },
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
            };

            try {
                // Usa html2pdf per generare il PDF dal contenuto HTML
                html2pdf().set(options).from(risultatiDiv).save()
                    .then(() => console.log("PDF generato con successo"))
                    .catch(err => console.error("Errore durante la generazione del PDF:", err));
            } catch (error) {
                console.error("Errore catturato durante la generazione del PDF:", error);
            }
        } else {
            alert("Nessun risultato disponibile per il download.");
            console.log("Nessun risultato trovato nel div #risultati.");
        }
    });
});
