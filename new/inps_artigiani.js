function calculateINPSArtigiani(redditoImponibile, anno, riduzione35, dataApertura) {
    let minimale = 4427.04;

    if (riduzione35) {
        minimale *= 0.65;
    }

    // Calculate proportion of minimale based on dataApertura
    const minimaleProporzionale = calculateMinimaleProporzionale(minimale, dataApertura);

    // Variable contributions if income exceeds €18,415
    let contributiVariabili = 0;
    const soglia = 18415;
    if (redditoImponibile > soglia) {
        const eccedenza = redditoImponibile - soglia;
        const aliquotaVariabile = yearsData[anno].inps_artigiani_variabile;
        contributiVariabili = eccedenza * (aliquotaVariabile / 100);
    }

    // Saldo and Acconti
    const saldoVariabile = contributiVariabili;
    const accontiVariabile = saldoVariabile * 0.80;

    return minimaleProporzionale + saldoVariabile + accontiVariabile;
}

// Reuse the same function from inps_commercianti.js
function calculateMinimaleProporzionale(minimale, dataApertura) {
    if (!dataApertura) {
        return minimale;
    }

    const aperturaDate = new Date(dataApertura);
    const yearStart = new Date(aperturaDate.getFullYear(), 0, 1);
    const yearEnd = new Date(aperturaDate.getFullYear(), 11, 31);
    const totalDays = (yearEnd - yearStart) / (1000 * 60 * 60 * 24) + 1;
    const activeDays = (yearEnd - aperturaDate) / (1000 * 60 * 60 * 24) + 1;

    const proportion = activeDays / totalDays;
    return minimale * proportion;
}
