// anno.js

const anniRiferimento = {
    2024: {
        // Puoi aggiungere dati specifici per l'anno 2024 se necessario
    },
    2025: {
        // Dati per il 2025
    },
    2026: {
        // Dati per il 2026
    },
    // Aggiungi altri anni qui
};

// Funzione per popolare la select degli anni
function populateAnniSelect() {
    const annoSelect = document.getElementById('annoReddito');
    annoSelect.innerHTML = ''; // Pulisce le opzioni esistenti

    for (const anno in anniRiferimento) {
        const option = document.createElement('option');
        option.value = anno;
        option.textContent = anno;
        annoSelect.appendChild(option);
    }

    // Seleziona automaticamente l'anno corrente se presente
    if (anniRiferimento.hasOwnProperty('2024')) {
        annoSelect.value = '2024';
    }
}

// Chiama la funzione al caricamento del documento
document.addEventListener('DOMContentLoaded', populateAnniSelect);
