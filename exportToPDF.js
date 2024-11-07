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
            let yPosition = 10;

            // Titolo del documento
            doc.setFont("helvetica", "bold");
            doc.setFontSize(16);
            doc.text("Risultati del Calcolo del Regime Forfettario", 10, yPosition);
            yPosition += 10;

            // Estrai il testo dai risultati e formattalo per il PDF
            const resultElements = risultatiDiv.querySelectorAll("*");
            resultElements.forEach(element => {
                if (element.tagName === "H2") {
                    // Stile per gli H2
                    doc.setFont("helvetica", "bold");
                    doc.setFontSize(14);
                    yPosition += 10;
                    doc.text(element.textContent, 10, yPosition);
                    yPosition += 6;
                } else if (element.tagName === "H3") {
                    // Stile per gli H3
                    doc.setFont("helvetica", "italic");
                    doc.setFontSize(12);
                    yPosition += 8;
                    doc.text(element.textContent, 10, yPosition);
                    yPosition += 4;
                } else if (element.tagName === "P" || element.tagName === "LI") {
                    // Stile per paragrafi e liste
                    doc.setFont("helvetica", "normal");
                    doc.setFontSize(10);
                    const textLines = doc.splitTextToSize(element.textContent, 180);
                    doc.text(textLines, 10, yPosition);
                    yPosition += textLines.length * 5 + 3;
                } else if (element.tagName === "TABLE") {
                    // Gestione delle tabelle
                    const rows = [];
                    const headers = [];
                    const tableRows = element.querySelectorAll("tr");
                    
                    // Estrai intestazioni di tabella
                    tableRows.forEach((row, index) => {
                        const cells = row.querySelectorAll("th, td");
                        const rowData = [];
                        cells.forEach(cell => {
                            rowData.push(cell.textContent);
                        });
                        if (index === 0 && row.querySelectorAll("th").length > 0) {
                            headers.push(...rowData);
                        } else {
                            rows.push(rowData);
                        }
                    });

                    // Disegna la tabella nel PDF
                    yPosition += 5;
                    doc.autoTable({
                        startY: yPosition,
                        head: [headers],
                        body: rows,
                        styles: { fontSize: 10, cellPadding: 2 },
                        theme: 'grid',
                        margin: { left: 10, right: 10 },
                    });
                    yPosition = doc.lastAutoTable.finalY + 10;
                }

                // Aggiungi pagina se si raggiunge il limite inferiore
                if (yPosition > 270) {
                    doc.addPage();
                    yPosition = 10;
                }
            });

            // Salva il PDF con nome specifico
            doc.save("calcolo_regime_forfettario.pdf");
        } else {
            alert("Nessun risultato disponibile per il download.");
        }
    });
});
