// cassa_inps_artigiani.js

function cassa_inps_artigiani() {
    return {
        calculate: function(params) {
            const {
                annoReddito,
                cassaInps,
                riduzioneContributi,
                dataApertura,
                aliquotaImposta,
                coefficienteRedditivita,
                redditoLordo,
                config
            } = params;

            // Calcolo del Reddito Netto
            const redditoNetto = Math.round(redditoLordo * coefficienteRedditivita);

            // Calcolo dell'Imposta Sostitutiva
            const impostaSostitutiva = Math.round(redditoNetto * aliquotaImposta);

            // Calcolo dell'Acconto Imposta Sostitutiva
            const accontoImposta = impostaSostitutiva;

            // Calcolo dei Contributi INPS
            let contributiFissi = 0;
            let contributiVariabili = 0;
            let contributiInps = 0;
            let accontoInps = 0;
            const sogliaReddito = config.sogliaReddito;

            const aliquotaVariabile = config.contributiINPS.inps_commercianti.aliquotaVariabile;
            const contributiFissiAnnui = config.contributiINPS.inps_commercianti.contributiFissiAnnui;

            // Applicazione della riduzione del 35% se selezionata
            const riduzione = riduzioneContributi ? config.contributiINPS.inps_commercianti.riduzione : 1;
            const contributiFissiRidotti = Math.round(contributiFissiAnnui * riduzione);
            contributiFissi = contributiFissiRidotti;

            // Calcolo dei contributi variabili
            if (redditoNetto > sogliaReddito) {
                contributiVariabili = Math.round((redditoNetto - sogliaReddito) * aliquotaVariabile * riduzione);
            }

            contributiInps = contributiFissi + contributiVariabili;
            accontoInps = Math.round(contributiVariabili * 0.80);

            // Calcolo dei Contributi Fissi Ipotetici (su anno completo)
            let contributiFissiIpotetici = riduzioneContributi ? Math.round(contributiFissiAnnui * config.contributiINPS.inps_commercianti.riduzione) : contributiFissiAnnui;

            // Calcolo delle Scadenze delle Rate Fisse
            let contributiFissiSulAnno = 0; // Totale Contributi Fissi sul 2024
            let rateScadenze = [
                { id: "1", scadenza: `16 maggio ${annoReddito}`, periodo: { start: new Date(annoReddito, 0, 1), end: new Date(annoReddito, 2, 31) }, dettaglio: "Contributi Fissi Gennaio - Marzo" },
                { id: "2", scadenza: `20 agosto ${annoReddito}`, periodo: { start: new Date(annoReddito, 3, 1), end: new Date(annoReddito, 5, 30) }, dettaglio: "Contributi Fissi Aprile - Giugno" },
                { id: "3", scadenza: `16 novembre ${annoReddito}`, periodo: { start: new Date(annoReddito, 6, 1), end: new Date(annoReddito, 8, 30) }, dettaglio: "Contributi Fissi Luglio - Settembre" },
                { id: "4", scadenza: `16 febbraio ${annoReddito + 1}`, periodo: { start: new Date(annoReddito, 9, 1), end: new Date(annoReddito, 11, 31) }, dettaglio: "Contributi Fissi Ottobre - Dicembre" }
            ];

            let importiRate = {};

            const apertura = dataApertura ? new Date(dataApertura) : null;

            rateScadenze.forEach(rate => {
                let importo = 0;

                if (apertura) {
                    if (apertura > rate.periodo.end) {
                        // Apertura dopo il periodo di copertura: nessun pagamento
                        importo = 0;
                    } else if (apertura > rate.periodo.start && apertura <= rate.periodo.end) {
                        // Apertura durante il periodo: calcolare la proporzione
                        const giorniTotali = Math.ceil((rate.periodo.end - rate.periodo.start) / (1000 * 60 * 60 * 24)) + 1;
                        const giorniAttivi = Math.ceil((rate.periodo.end - apertura) / (1000 * 60 * 60 * 24)) + 1;
                        const proporzione = giorniAttivi / giorniTotali;
                        importo = Math.round((contributiFissiAnnui / 4) * proporzione);
                    } else {
                        // Apertura prima del periodo di copertura: pagamento intero della rata
                        importo = Math.round(contributiFissiAnnui / 4);
                    }
                } else {
                    // Nessuna apertura data: pagamento intero della rata
                    importo = Math.round(contributiFissiAnnui / 4);
                }

                // Applicazione della riduzione del 35% solo se il checkbox è selezionato
                importo = riduzioneContributi ? Math.round(importo * config.contributiINPS.inps_commercianti.riduzione) : importo;

                importiRate[rate.id] = importo;
                contributiFissiSulAnno += importo;
            });

            // Popola la tabella dei risultati
            document.getElementById("redditoLordoOutput").innerText = redditoLordo.toLocaleString('it-IT') + "€";
            document.getElementById("annoRedditoOutput").innerText = annoReddito;
            document.getElementById("redditoNettoOutput").innerText = redditoNetto.toLocaleString('it-IT') + "€";
            document.getElementById("aliquotaImpostaOutput").innerText = (aliquotaImposta * 100).toFixed(0) + "%";
            document.getElementById("annoRedditoOutput2").innerText = annoReddito;
            document.getElementById("impostaSostitutivaOutput").innerText = impostaSostitutiva.toLocaleString('it-IT') + "€";
            document.getElementById("annoAccontoImposta").innerText = annoReddito + 1;
            document.getElementById("accontoImpostaOutput").innerText = accontoImposta.toLocaleString('it-IT') + "€";
            document.getElementById("annoRedditoOutput3").innerText = annoReddito;
            document.getElementById("contributiInpsOutput").innerText = contributiInps.toLocaleString('it-IT') + "€";
            document.getElementById("annoRedditoOutput4").innerText = annoReddito;
            document.getElementById("contributiFissiOutput").innerText = contributiFissiSulAnno.toLocaleString('it-IT') + "€";
            document.getElementById("annoRedditoOutput5").innerText = annoReddito;
            document.getElementById("contributiVariabiliOutput").innerText = contributiVariabili.toLocaleString('it-IT') + "€";
            document.getElementById("totaleContributiInpsOutput").innerText = (Number(contributiFissiSulAnno) + Number(contributiVariabili)).toLocaleString('it-IT') + "€";
            document.getElementById("contributiFissiIpoteticiOutput").innerText = contributiFissiIpotetici.toLocaleString('it-IT') + "€";
            document.getElementById("annoAccontoInps").innerText = annoReddito + 1;
            document.getElementById("accontoInpsOutput").innerText = accontoInps.toLocaleString('it-IT') + "€";

            // Gestione della visualizzazione delle righe
            contributiFissiIpoteticiRow.style.display = "table-row";
            document.getElementById("contributiInpsRow").style.display = "none";
            document.getElementById("contributiFissiRow").style.display = "table-row";
            if (contributiVariabili > 0) {
                document.getElementById("contributiVariabiliRow").style.display = "table-row";
            } else {
                document.getElementById("contributiVariabiliRow").style.display = "none";
            }
            document.getElementById("totaleContributiInpsRow").style.display = "table-row";

            // Calcolo delle Scadenze
            const annoScadenza = annoReddito + 1;
            document.getElementById("annoScadenzaGiugno").innerText = annoScadenza;
            document.getElementById("annoScadenzaNovembre").innerText = annoScadenza;

            document.getElementById("annoScadenzaGiugnoDettaglio").innerText = annoScadenza;
            document.getElementById("annoScadenzaNovembreDettaglio").innerText = annoScadenza;
            document.getElementById("annoAccontoImpostaDettaglio").innerText = annoReddito + 1;
            document.getElementById("annoAccontoImpostaDettaglio2").innerText = annoReddito + 1;
            document.getElementById("annoAccontoInpsDettaglio").innerText = annoReddito + 1;

            // Popola la tabella delle scadenze fisse
            document.getElementById("scadenzaFissa1").innerText = rateScadenze[0].scadenza;
            document.getElementById("importoFissa1").innerText = importiRate[rateScadenze[0].id].toLocaleString('it-IT') + "€";
            document.getElementById("dettaglioFissa1").innerText = rateScadenze[0].dettaglio;
            document.getElementById("scadenzaFissa1Row").style.display = "table-row";

            document.getElementById("scadenzaFissa2").innerText = rateScadenze[1].scadenza;
            document.getElementById("importoFissa2").innerText = importiRate[rateScadenze[1].id].toLocaleString('it-IT') + "€";
            document.getElementById("dettaglioFissa2").innerText = rateScadenze[1].dettaglio;
            document.getElementById("scadenzaFissa2Row").style.display = "table-row";

            document.getElementById("scadenzaFissa3").innerText = rateScadenze[2].scadenza;
            document.getElementById("importoFissa3").innerText = importiRate[rateScadenze[2].id].toLocaleString('it-IT') + "€";
            document.getElementById("dettaglioFissa3").innerText = rateScadenze[2].dettaglio;
            document.getElementById("scadenzaFissa3Row").style.display = "table-row";

            document.getElementById("scadenzaFissa4").innerText = rateScadenze[3].scadenza;
            document.getElementById("importoFissa4").innerText = importiRate[rateScadenze[3].id].toLocaleString('it-IT') + "€";
            document.getElementById("dettaglioFissa4").innerText = rateScadenze[3].dettaglio;
            document.getElementById("scadenzaFissa4Row").style.display = "table-row";

            // Popola la sezione "Come si Calcolano"
            let dettaglioTesto = `In regime forfettario paghi l'imposta sostitutiva, che nel tuo caso è del ${(aliquotaImposta * 100).toFixed(0)}%.<br><br>`;
            dettaglioTesto += `Paghi inoltre i contributi fissi INPS Commercianti di <strong><u>${contributiFissiSulAnno.toLocaleString('it-IT')}€</u></strong> per quest'anno.<br><br>`;
            dettaglioTesto += `Normalmente invece per un anno completo i contributi fissi sono di <u>${contributiFissiIpotetici.toLocaleString('it-IT')}€</u>.<br><br>`;
            if (contributiVariabili > 0) {
                let aliquotaVariabileEffettiva = aliquotaVariabile * (riduzioneContributi ? config.contributiINPS.inps_commercianti.riduzione : 1) * 100;
                let aliquotaVariabileDisplay = Math.round(aliquotaVariabileEffettiva) + "%";
                dettaglioTesto += `Dal momento che il tuo reddito netto supera la soglia di ${sogliaReddito}€, paghi anche i contributi variabili del ${aliquotaVariabileDisplay} sull'eccedenza di <u>${(redditoNetto - sogliaReddito).toLocaleString('it-IT')}€</u>.`;
            } else {
                dettaglioTesto += `Oltre la soglia di reddito netto (${sogliaReddito}€) pagherai anche i contributi variabili, che in questo caso non sono dovuti.`;
            }

            // Esempio di calcolo
            dettaglioTesto += `<h3>Esempio di calcolo:</h3>`;
            dettaglioTesto += `<p>Per un incasso di ${redditoLordo.toLocaleString('it-IT')}€, il ${(coefficienteRedditivita * 100).toFixed(0)}% corrisponde a ${redditoNetto.toLocaleString('it-IT')}€. Su questo importo, dovrai pagare:</p>`;
            
            dettaglioTesto += `<ul>`;
            dettaglioTesto += `<li>Imposta sostitutiva: ${(aliquotaImposta * 100).toFixed(0)}% su ${redditoNetto.toLocaleString('it-IT')}€, che equivale a <strong><span class="highlight-yellow">${impostaSostitutiva.toLocaleString('it-IT')}€</span></strong>.</li>`;
            
            // Calcolo dei contributi fissi e variabili
            dettaglioTesto += `<li>Contributi INPS: <strong><span class="highlight-yellow">${contributiFissiSulAnno.toLocaleString('it-IT')}€</span></strong> di contributi fissi e <strong><span class="highlight-yellow">${contributiVariabili.toLocaleString('it-IT')}€</span></strong> di contributi variabili (${(aliquotaVariabile * 100).toFixed(0)}% sull'eccedenza).</li>`;
            dettaglioTesto += `</ul>`;
            
            const totaleSaldo = impostaSostitutiva + contributiInps;
            dettaglioTesto += `<p>Quindi, a livello di saldo, pagherai <strong><span class="highlight-yellow">${totaleSaldo.toLocaleString('it-IT')}€</span></strong> (di cui <span class="highlight-yellow">${impostaSostitutiva.toLocaleString('it-IT')}€</span> di imposta e <span class="highlight-yellow">${contributiInps.toLocaleString('it-IT')}€</span> di contributi).</p>`;
            
            // Acconti
            const totaleAcconti = accontoImposta + accontoInps;
            dettaglioTesto += `<h3>Acconti:</h3>`;
            dettaglioTesto += `<p>Oltre al saldo, dovrai versare anche gli acconti per l’anno successivo:</p>`;
            dettaglioTesto += `<ul>`;
            dettaglioTesto += `<li>Imposta sostitutiva: pagherai il 100% dell'importo del saldo come acconto, quindi ulteriori <strong><span class="highlight-blue">${accontoImposta.toLocaleString('it-IT')}€</span></strong>.</li>`;
            dettaglioTesto += `<li>Contributi INPS: pagherai l’80% dell'importo dei contributi variabili come acconto, quindi <strong><span class="highlight-blue">${accontoInps.toLocaleString('it-IT')}€</span></strong>.</li>`;
            dettaglioTesto += `</ul>`;
            
            const totaleComplessivo = totaleSaldo + totaleAcconti;
            dettaglioTesto += `<h3>Totale complessivo:</h3>`;
            dettaglioTesto += `<p>Saldo totale: <strong><span class="highlight-yellow">${totaleSaldo.toLocaleString('it-IT')}€</span></strong> (di cui <span class="highlight-yellow">${impostaSostitutiva.toLocaleString('it-IT')}€</span> di imposta e <span class="highlight-yellow">${contributiInps.toLocaleString('it-IT')}€</span> di contributi)</p>`;
            dettaglioTesto += `<p>Acconti totali: <strong><span class="highlight-blue">${totaleAcconti.toLocaleString('it-IT')}€</span></strong> (di cui <span class="highlight-blue">${accontoImposta.toLocaleString('it-IT')}€</span> di imposta e <span class="highlight-blue">${accontoInps.toLocaleString('it-IT')}€</span> di contributi)</p>`;
            dettaglioTesto += `<p>Importo complessivo (saldo + acconti): <strong><u>${totaleComplessivo.toLocaleString('it-IT')}€</u></strong></p>`;
            
            dettaglioTesto += `<p>Questi importi sono indicativi e, in sede di dichiarazione dei redditi, verranno calcolati con precisione.</p>`;

            dettaglioCalcoli.innerHTML = dettaglioTesto;

            // Popola la sezione "Dettaglio pagamenti"
            // Implementa secondo necessità
        }
    };
}
