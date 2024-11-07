function calculate() {
    const anno = document.getElementById('anno').value;
    const redditoLordo = parseFloat(document.getElementById('reddito').value);
    const impostaSostitutiva = parseFloat(document.getElementById('imposta').value);
    const coefficienteRedditivita = parseFloat(document.getElementById('coefficiente').value) / 100;
    const cassa = document.getElementById('cassa').value;
    const riduzione35 = document.getElementById('riduzione').checked;
    const dataApertura = document.getElementById('dataApertura').value;

    // Calculate taxable income
    const redditoImponibile = redditoLordo * coefficienteRedditivita;

    let resultText = `<h2>Risultati per l'anno ${anno}</h2>`;
    resultText += `<p>Reddito Imponibile: €${redditoImponibile.toFixed(2)}</p>`;

    // Calculate taxes
    const imposta = redditoImponibile * (impostaSostitutiva / 100);
    resultText += `<p>Imposta (${impostaSostitutiva}%): €${imposta.toFixed(2)}</p>`;

    // Calculate contributions based on selected cassa
    if (cassa === 'gestione_separata_inps') {
        const contributi = calculateGestioneSeparataINPS(redditoImponibile, anno);
        resultText += `<p>Contributi Gestione Separata INPS (${yearsData[anno].gestione_separata_inps}%): €${contributi.toFixed(2)}</p>`;
    } else if (cassa === 'inps_commercianti') {
        const contributi = calculateINPSCommercianti(redditoImponibile, anno, riduzione35, dataApertura);
        resultText += `<p>Contributi INPS Commercianti: €${contributi.toFixed(2)}</p>`;
    } else if (cassa === 'inps_artigiani') {
        const contributi = calculateINPSArtigiani(redditoImponibile, anno, riduzione35, dataApertura);
        resultText += `<p>Contributi INPS Artigiani: €${contributi.toFixed(2)}</p>`;
    } else {
        // Placeholder for other casse
        resultText += `<p>Calcolo contributi per ${cassa} non ancora implementato.</p>`;
    }

    document.getElementById('result').innerHTML = resultText;
}

// Event listeners for dynamic form elements
document.getElementById('cassa').addEventListener('change', function() {
    const cassa = this.value;
    const riduzioneContainer = document.getElementById('riduzione-container');
    const dataAperturaContainer = document.getElementById('data-apertura-container');

    if (cassa === 'inps_commercianti' || cassa === 'inps_artigiani') {
        riduzioneContainer.style.display = 'block';
        dataAperturaContainer.style.display = 'block';
    } else {
        riduzioneContainer.style.display = 'none';
        dataAperturaContainer.style.display = 'none';
    }
});
