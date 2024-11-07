document.addEventListener("DOMContentLoaded", function () {
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

    downloadButton.addEventListener("click", function () {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        // Trova il contenuto dei risultati
        const risultatiDiv = document.getElementById("risultati");

        if (risultatiDiv && risultatiDiv.innerHTML.trim() !== "") {
            // Estrarre il testo dai risultati
            let textContent = "";
            const resultElements = risultatiDiv.querySelectorAll("*");

            resultElements.forEach(element => {
                if (element.tagName === "H2" || element.tagName === "H3") {
                    textContent += element.textContent.toUpperCase() + "\n\n";
                } else if (element.tagName === "P" || element.tagName === "LI" || element.tagName === "TD") {
                    textContent += element.textContent + "\n";
                } else if (element.tagName === "TABLE") {
                    textContent += "\n[TABELLA]\n"; // Placeholder per gestire le tabelle
                }
            });

            // Aggiungere il testo estratto nel PDF
            doc.setFont("helvetica", "normal");
            doc.setFontSize(12);
            doc.text(textContent, 10, 10);

            // Salvare il PDF con nome specifico
            doc.save("calcolo_regime_forfettario.pdf");
        } else {
            alert("Nessun risultato disponibile per il download.");
        }
    });
});
