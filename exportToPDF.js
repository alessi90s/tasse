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
        const risultatiDiv = document.getElementById("risultati");
        
        if (risultatiDiv && risultatiDiv.innerHTML.trim() !== "") {
            // Opzioni per migliorare la qualità del PDF
            const options = {
                margin: [10, 10, 10, 10],
                filename: 'calcolo_regime_forfettario.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 3, useCORS: true },
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
            };

            // Usa html2pdf per generare il PDF dal contenuto HTML
            html2pdf().set(options).from(risultatiDiv).save();
        } else {
            alert("Nessun risultato disponibile per il download.");
        }
    });
});
