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
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        // Trova il contenuto dei risultati
        const risultatiDiv = document.getElementById("risultati");
        if (risultatiDiv && risultatiDiv.innerHTML.trim() !== "") {
            // Usa il metodo html() di jsPDF per includere l'HTML con la formattazione
            doc.html(risultatiDiv, {
                callback: function (doc) {
                    // Salva il PDF con nome specifico
                    doc.save("calcolo_regime_forfettario.pdf");
                },
                x: 10,
                y: 10,
                width: 180, // Imposta la larghezza del contenuto per adattarsi meglio al PDF
                windowWidth: risultatiDiv.scrollWidth // Dimensione della finestra per migliorare il layout
            });
        } else {
            alert("Nessun risultato disponibile per il download.");
        }
    });
});
