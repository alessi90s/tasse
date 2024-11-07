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

        // Prendi il contenuto dei risultati
        const risultatiDiv = document.getElementById("risultati");
        if (risultatiDiv && risultatiDiv.innerHTML.trim() !== "") {
            doc.text("Risultati del Calcolo", 10, 10);
            doc.fromHTML(risultatiDiv.innerHTML, 10, 20);
            doc.save("calcolo_regime_forfettario.pdf");
        } else {
            alert("Nessun risultato disponibile per il download.");
        }
    });
});
