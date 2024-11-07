// Define the percentages for each year
const yearsData = {
    2024: {
        gestione_separata_inps: 26.07,
        inps_commercianti_variabile: 24.48,
        inps_artigiani_variabile: 24,
    },
    2025: {
        gestione_separata_inps: 26.50, // Example percentage
        inps_commercianti_variabile: 24.70, // Example percentage
        inps_artigiani_variabile: 24.20, // Example percentage
    }
};

// Populate the year select options
window.onload = function() {
    const annoSelect = document.getElementById('anno');
    for (const year in yearsData) {
        const option = document.createElement('option');
        option.value = year;
        option.text = year;
        annoSelect.add(option);
    }
};
