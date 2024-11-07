document.addEventListener("DOMContentLoaded", function () {
    // Aggiunta del pulsante per il download del PDF tramite stampa del browser
    const printButton = document.createElement("button");
    printButton.textContent = "Stampa/Salva come PDF";
    printButton.style.cssText = `
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
    document.querySelector(".calculator-container").appendChild(printButton);

    // Listener per il click del pulsante di stampa
    printButton.addEventListener("click", function () {
        // Mostra solo la sezione dei risultati per la stampa
        const risultatiDiv = document.getElementById("risultati");

        if (risultatiDiv && risultatiDiv.innerHTML.trim() !== "") {
            // Clona l'elemento risultati per la stampa
            const printContents = risultatiDiv.cloneNode(true);

            // Crea un nuovo documento per la stampa
            const printWindow = window.open("", "", "width=800,height=600");
            printWindow.document.write(`
                <html>
                    <head>
                        <title>Risultati del Calcolo</title>
                        <style>
                            body { font-family: Arial, sans-serif; padding: 20px; }
                            .result-content h2, .result-content h3 { margin-top: 0; }
                            .result-table { width: 100%; border-collapse: collapse; }
                            .result-table th, .result-table td {
                                border: 1px solid #ddd; padding: 8px; text-align: left;
                            }
                            .result-table th { background-color: #f2f2f2; }
                            .highlight { font-weight: bold; color: #007BFF; }
                        </style>
                    </head>
                    <body>${printContents.outerHTML}</body>
                </html>
            `);
            printWindow.document.close();
            printWindow.print();
        } else {
            alert("Nessun risultato disponibile per il download.");
        }
    });
});
