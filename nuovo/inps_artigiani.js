// inps_artigiani.js

export function calcolaContributi({ redditoNetto, riduzioneContributi, dataApertura, annoReddito }) {
    // Definizione delle percentuali per l'anno di riferimento
    const aliquoteContributi = {
        2023: {
            contributiFissiAnnui: 4200, // Esempio: 4200€ per il 2023
            aliquotaVariabile: 23.00 // 23% per il 2023
        },
        2024: {
            contributiFissiAnnui: 4427, // 4427€ per il 2024
            aliquotaVariabile: 24.00 // 24% per il 2024
        },
        2025: {
            contributiFissiAnnui: 4600, // Esempio: 4600€ per il 2025
            aliquotaVariabile: 24.00 // 24% per il 2025
        },
        // Aggiungi altri anni e percentuali se necessario
    };

    const configurazione = aliquoteContributi[annoReddito] ? aliquoteContributi[annoReddito] : aliquoteContributi[2024];

    const contributiFissiAnnui = configurazione.contributiFissiAnnui;
    const aliquotaVariabile = configurazione.aliquotaVariabile / 100;
    const riduzione = riduzioneContributi ? 0.65 : 1;

    const contributiFissi = Math.round(contributiFissiAnnui * riduzione);
    let contributiVariabili = 0;
    const sogliaReddito = 18415;
    if (redditoNetto > sogliaReddito) {
        contributiVariabili = Math.round((redditoNetto - sogliaReddito) * aliquotaVariabile * riduzione);
    }

    const contributiInps = contributiFissi + contributiVariabili;
    const accontoInps = Math.round(contributiVariabili * 0.80);

    // Calcolo rate fisse in base alla data di apertura
    let contributiFissiSulAnno = 0;
    let importiRate = {};
    const rateScadenze = [
        { id: "1", scadenza: `16 maggio ${annoReddito}`, periodo: { start: new Date(annoReddito, 0, 1), end: new Date(annoReddito, 2, 31) }, dettaglio: "Contributi Fissi Gennaio - Marzo" },
        { id: "2", scadenza: `20 agosto ${annoReddito}`, periodo: { start: new Date(annoReddito, 3, 1), end: new Date(annoReddito, 5, 30) }, dettaglio: "Contributi Fissi Aprile - Giugno" },
        { id: "3", scadenza: `16 novembre ${annoReddito}`, periodo: { start: new Date(annoReddito, 6, 1), end: new Date(annoReddito, 8, 30) }, dettaglio: "Contributi Fissi Luglio - Settembre" },
        { id: "4", scadenza: `16 febbraio ${annoReddito + 1}`, periodo: { start: new Date(annoReddito, 9, 1), end: new Date(annoReddito, 11, 31) }, dettaglio: "Contributi Fissi Ottobre - Dicembre" }
    ];

    if (dataApertura) {
        const apertura = new Date(dataApertura);
        rateScadenze.forEach(rate => {
            let importo = 0;
            if (apertura > rate.periodo.end) {
                importo = 0;
            } else if (apertura > rate.periodo.start && apertura <= rate.periodo.end) {
                const giorniTotali = Math.ceil((rate.periodo.end - rate.periodo.start) / (1000 * 60 * 60 * 24)) + 1;
                const giorniAttivi = Math.ceil((rate.periodo.end - apertura) / (1000 * 60 * 60 * 24)) + 1;
                const proporzione = giorniAttivi / giorniTotali;
                importo = Math.round((contributiFissiAnnui / 4) * proporzione);
            } else {
                importo = Math.round(contributiFissiAnnui / 4);
            }
            importo = riduzioneContributi ? Math.round(importo * 0.65) : importo;
            importiRate[rate.id] = importo;
            contributiFissiSulAnno += importo;
        });
    } else {
        // Nessuna apertura data: pagamento intero della rata
        contributiFissiSulAnno = Math.round(contributiFissiAnnui / 4) * 4;
    }

    // Calcolo dei Contributi Fissi Ipotetici (su anno completo)
    const contributiFissiIpotetici = riduzioneContributi ? Math.round(contributiFissiAnnui * 0.65) : contributiFissiAnnui;

    return {
        contributiFissi,
        contributiVariabili,
        contributiInps,
        accontoInps,
        contributiFissiIpotetici,
        contributiFissiSulAnno,
        importiRate
    };
}
