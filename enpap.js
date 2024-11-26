// enpap.js

document.addEventListener('DOMContentLoaded', function() {
    const cassaInpsSelect = document.getElementById("cassaInps");
    const opzioniContainer = document.getElementById("opzioniCommercianteArtigiano");
    const form = document.getElementById("calcolatoreForm");
    const dettaglioCalcoli = document.getElementById("dettaglioCalcoli");
    const contributiFissiIpoteticiRow = document.getElementById("contributiFissiIpoteticiRow");

    // Gestione della visualizzazione delle opzioni specifiche per ENPAP
    cassaInpsSelect.addEventListener("change", function() {
        const cassa = cassaInpsSelect.value;
        if (cassa === "enpap") {
            opzioniContainer.style.display = "block";
            // Nascondi altre opzioni se necessario
            // Ad esempio, se ci sono opzioni specifiche per Commercianti o Artigiani
            // puoi nasconderle qui
        } else if (cassa === "inps_commercianti" || cassa === "inps_artigiani") {
            opzioniContainer.style.display = "block";
        } else {
            opzioniContainer.style.display = "none";
            document.getElementById("riduzioneContributi").checked = false;
            document.getElementById("dataApertura").value = "";
        }
    });

    // Override del gestore del form per ENPAP
    form.addEventListener("submit", function(event) {
        const cassaInps = cassaInpsSelect.value;
        if (cassaInps !== "enpap") {
            // Lascia che il gestore principale si occupi delle altre casse
            return;
        }

        event.preventDefault(); // Previene il comportamento predefinito del form

        // Recupera i valori di input
        const annoReddito = parseInt(document.getElementById("annoReddito").value);
        const riduzioneContributi = document.getElementById("riduzioneContributi")?.checked || false;
        const dataApertura = document.getElementById("dataApertura")?.value || "";
        const aliquotaImposta = parseFloat(document.getElementById("aliquotaImposta").value);
        const coefficienteRedditivita = parseFloat(document.getElementById("coefficienteRedditivita").value) / 100;
        const redditoLordo = parseInt(document.getElementById("redditoLordo").value);

        // Validazione
        if (
            isNaN(annoReddito) ||
            isNaN(aliquotaImposta) ||
            isNaN(coefficienteRedditivita) ||
            isNaN(redditoLordo) ||
            redditoLordo <= 0
        ) {
            alert("Per favore, compila tutti i campi correttamente.");
            return;
        }

        // Calcolo del Reddito Netto
        const redditoNetto = Math.round(redditoLordo * coefficienteRedditivita);

        // Calcolo dell'Imposta Sostitutiva
        const impostaSostitutiva = Math.round(redditoNetto * aliquotaImposta);

        // Calcolo dell'Acconto Imposta Sostitutiva
        const accontoImposta = impostaSostitutiva;

        // Calcolo dei Contributi ENPAP (10% del reddito netto)
        let contributiInps = Math.round(reditoNetto * 0.10);
        let accontoInps = Math.round(contributiInps * 0.80);

        // Contributi Fissi Ipotetici per ENPAP (non necessari in questa versione)
        // Se desideri comunque mostrare un contributo fisso, puoi impostarlo qui
        const contributiFissiIpotetici = 0; // O qualsiasi altro valore se necessario

        // Calcolo delle Scadenze delle Rate Fisse (se applicabile)
        // In questo caso, semplifichiamo e assumiamo rate fisse senza considerare dataApertura
        let contributiFissiSulAnno = contributiInps; // In questo caso, non ci sono contributi fissi

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
        document.getElementById("contributiVariabiliOutput").innerText = ""; // Non applicabile per ENPAP
        document.getElementById("annoRedditoOutput6").innerText = annoReddito;
        document.getElementById("totaleContributiInpsOutput").innerText = contributiInps.toLocaleString('it-IT') + "€";
        document.getElementById("contributiFissiIpoteticiOutput").innerText = contributiFissiIpotetici.toLocaleString('it-IT') + "€";
        document.getElementById("annoAccontoInps").innerText = annoReddito + 1;
        document.getElementById("accontoInpsOutput").innerText = accontoInps.toLocaleString('it-IT') + "€";

        // Gestione della visualizzazione delle righe
        contributiFissiIpoteticiRow.style.display = "none"; // Nascondi se non necessario
        document.getElementById("contributiInpsRow").style.display = "none";
        document.getElementById("contributiFissiRow").style.display = "none";
        document.getElementById("contributiVariabiliRow").style.display = "none";
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

        // Popolazione delle Scadenze Generali
        let totaleGiugno = impostaSostitutiva + Math.round(accontoImposta / 2) + contributiInps + Math.round(accontoInps / 2);
        let dettaglioGiugno = `Saldo Imposta Sostitutiva (${impostaSostitutiva.toLocaleString('it-IT')}€) + Prima Rata Acconto Imposta (${Math.round(accontoImposta / 2).toLocaleString('it-IT')}€) + Contributi ENPAP (${contributiInps.toLocaleString('it-IT')}€) + Prima Rata Acconto ENPAP (${Math.round(accontoInps / 2).toLocaleString('it-IT')}€)`;
        let totaleNovembre = Math.round(accontoImposta / 2) + Math.round(accontoInps / 2);
        let dettaglioNovembre = `Seconda Rata Acconto Imposta (${Math.round(accontoImposta / 2).toLocaleString('it-IT')}€) + Seconda Rata Acconto ENPAP (${Math.round(accontoInps / 2).toLocaleString('it-IT')}€)`;

        document.getElementById("totaleGiugno").innerText = totaleGiugno.toLocaleString('it-IT') + "€";
        document.getElementById("dettaglioGiugno").innerText = dettaglioGiugno + "€";
        document.getElementById("totaleNovembre").innerText = totaleNovembre.toLocaleString('it-IT') + "€";
        document.getElementById("dettaglioNovembre").innerText = dettaglioNovembre + "€";

        // Mostra le scadenze delle rate fisse per ENPAP
        const rateScadenze = [
            { id: "1", scadenza: `16 maggio ${annoReddito}`, dettaglio: "Contributi ENPAP - Prima rata" },
            { id: "2", scadenza: `20 agosto ${annoReddito}`, dettaglio: "Contributi ENPAP - Seconda rata" }
        ];

        rateScadenze.forEach(rate => {
            document.getElementById("scadenzaFissa" + rate.id).innerText = rate.scadenza;
            document.getElementById("importoFissa" + rate.id).innerText = (contributiInps / 2).toLocaleString('it-IT');
            document.getElementById("dettaglioFissa" + rate.id).innerText = rate.dettaglio;
            document.getElementById("scadenzaFissa" + rate.id + "Row").style.display = "table-row";
        });

        // Popola la sezione "Come si Calcolano"
        let dettaglioTesto = `In regime forfettario paghi l'imposta sostitutiva, che nel tuo caso è del ${(aliquotaImposta * 100).toFixed(0)}%.<br><br>`;
        dettaglioTesto += `Paghi inoltre i contributi ENPAP pari al <strong><u>10% del reddito netto (${redditoNetto.toLocaleString('it-IT')}€)</u></strong>, che equivalgono a <strong><u>${contributiInps.toLocaleString('it-IT')}€</u></strong>.<br><br>`;
        dettaglioTesto += `<h3>Esempio di calcolo:</h3>`;
        dettaglioTesto += `<p>Per un incasso di ${redditoLordo.toLocaleString('it-IT')}€, il ${(coefficienteRedditivita * 100).toFixed(0)}% corrisponde a ${redditoNetto.toLocaleString('it-IT')}€. Su questo importo, dovrai pagare:</p>`;
        
        dettaglioTesto += `<ul>`;
        dettaglioTesto += `<li>Imposta sostitutiva: ${(aliquotaImposta * 100).toFixed(0)}% su ${redditoNetto.toLocaleString('it-IT')}€, che equivale a <strong><span class="highlight-yellow">${impostaSostitutiva.toLocaleString('it-IT')}€</span></strong>.</li>`;
        dettaglioTesto += `<li>Contributi ENPAP: 10% di ${redditoNetto.toLocaleString('it-IT')}€, che equivale a <strong><span class="highlight-yellow">${contributiInps.toLocaleString('it-IT')}€</span></strong>.</li>`;
        dettaglioTesto += `</ul>`;
        
        const totaleSaldo = impostaSostitutiva + contributiInps;
        dettaglioTesto += `<p>Quindi, a livello di saldo, pagherai <strong><span class="highlight-yellow">${totaleSaldo.toLocaleString('it-IT')}€</span></strong> (di cui <span class="highlight-yellow">${impostaSostitutiva.toLocaleString('it-IT')}€</span> di imposta e <span class="highlight-yellow">${contributiInps.toLocaleString('it-IT')}€</span> di contributi).</p>`;
        
        // Acconti
        dettaglioTesto += `<h3>Acconti:</h3>`;
        dettaglioTesto += `<p>Oltre al saldo, dovrai versare anche gli acconti per l’anno successivo:</p>`;
        dettaglioTesto += `<ul>`;
        dettaglioTesto += `<li>Imposta sostitutiva: pagherai il 100% dell'importo del saldo come acconto, quindi ulteriori <strong><span class="highlight-blue">${accontoImposta.toLocaleString('it-IT')}€</span></strong>.</li>`;
        dettaglioTesto += `<li>Contributi ENPAP: pagherai l’80% dell'importo dei contributi come acconto, quindi <strong><span class="highlight-blue">${accontoInps.toLocaleString('it-IT')}€</span></strong>.</li>`;
        dettaglioTesto += `</ul>`;
        
        const totaleComplessivo = totaleSaldo + totaleAcconti;
        dettaglioTesto += `<h3>Totale complessivo:</h3>`;
        dettaglioTesto += `<p>Saldo totale: <strong><span class="highlight-yellow">${totaleSaldo.toLocaleString('it-IT')}€</span></strong> (di cui <span class="highlight-yellow">${impostaSostitutiva.toLocaleString('it-IT')}€</span> di imposta e <span class="highlight-yellow">${contributiInps.toLocaleString('it-IT')}€</span> di contributi)</p>`;
        dettaglioTesto += `<p>Acconti totali: <strong><span class="highlight-blue">${accontoAcconti.toLocaleString('it-IT')}€</span></strong> (di cui <span class="highlight-blue">${accontoImposta.toLocaleString('it-IT')}€</span> di imposta e <span class="highlight-blue">${accontoInps.toLocaleString('it-IT')}€</span> di contributi)</p>`;
        dettaglioTesto += `<p>Importo complessivo (saldo + acconti): <strong>${totaleComplessivo.toLocaleString('it-IT')}€</strong></p>`;
        
        dettaglioTesto += `<p>Questi importi sono indicativi e, in sede di dichiarazione dei redditi, verranno calcolati con precisione.</p>`;
        
        dettaglioCalcoli.innerHTML = dettaglioTesto;

        // Popola la sezione "Dettaglio pagamenti"
        document.getElementById("detAnnoPagamenti").innerText = annoReddito;
        document.getElementById("detRedditoLordoPagamenti").innerText = redditoLordo.toLocaleString('it-IT');
        document.getElementById("detRedditoLordoDetPagamenti").innerText = redditoLordo.toLocaleString('it-IT');
        document.getElementById("detCoefficienteDetPagamenti").innerText = (coefficienteRedditivita * 100).toFixed(0) + "%";
        document.getElementById("detRedditoNettoPagamenti").innerText = redditoNetto.toLocaleString('it-IT');
        document.getElementById("detRedditoNettoDetPagamenti").innerText = redditoNetto.toLocaleString('it-IT');
        document.getElementById("detAliquotaImpostaPagamenti").innerText = (aliquotaImposta * 100).toFixed(0) + "%";
        document.getElementById("detImpostaSostitutivaPagamenti").innerText = impostaSostitutiva.toLocaleString('it-IT');

        document.getElementById("detContributiInpsTitoloPagamenti").innerText = "ENPAP";
        document.getElementById("detRedditoNettoInpsPagamenti").innerText = redditoNetto.toLocaleString('it-IT');
        document.getElementById("detAliquotaContributivaPagamenti").innerText = "10%";
        document.getElementById("detContributiInpsCalcolatiPagamenti").innerText = contributiInps.toLocaleString('it-IT');

        // Calcolo dei Saldi e Acconti
        document.getElementById("detSaldoImpostaPagamenti").innerText = impostaSostitutiva.toLocaleString('it-IT');
        document.getElementById("detAccontoImpostaPagamenti").innerText = accontoImposta.toLocaleString('it-IT');
        document.getElementById("detPrimaRataImpostaPagamenti").innerText = Math.round(accontoImposta / 2).toLocaleString('it-IT');
        document.getElementById("detSecondaRataImpostaPagamenti").innerText = Math.round(accontoImposta / 2).toLocaleString('it-IT');

        document.getElementById("detSaldoContributiPagamenti").innerText = contributiInps.toLocaleString('it-IT');
        document.getElementById("detAccontoContributiPagamenti").innerText = accontoInps.toLocaleString('it-IT');
        document.getElementById("detPrimaRataContributiPagamenti").innerText = Math.round(accontoInps / 2).toLocaleString('it-IT');
        document.getElementById("detSecondaRataContributiPagamenti").innerText = Math.round(accontoInps / 2).toLocaleString('it-IT');
        document.getElementById("detContributiInpsTipoPagamenti").innerText = "ENPAP";

        // Riepilogo dei Pagamenti
        const totaleTasseContributi = impostaSostitutiva + contributiInps;
        const totaleAcconti = accontoImposta + accontoInps;
        const totaleComplessivo = totaleTasseContributi + totaleAcconti;

        // Calcolo delle percentuali rispetto al reddito lordo
        const percentualeTotaleTasseContributi = ((totaleTasseContributi / redditoLordo) * 100).toFixed(0) + "%";
        const percentualeTotaleAcconti = ((totaleAcconti / redditoLordo) * 100).toFixed(0) + "%";
        const percentualeTotaleComplessivo = ((totaleComplessivo / redditoLordo) * 100).toFixed(0) + "%";

        document.getElementById("detTotaleTasseContributiPagamenti").innerText = totaleTasseContributi.toLocaleString('it-IT');
        document.getElementById("detTotaleAccontiPagamenti").innerText = totaleAcconti.toLocaleString('it-IT');
        document.getElementById("detTotaleComplessivoPagamenti").innerText = totaleComplessivo.toLocaleString('it-IT');

        document.getElementById("percentualeTotaleTasseContributi").innerText = percentualeTotaleTasseContributi;
        document.getElementById("percentualeTotaleAcconti").innerText = percentualeTotaleAcconti;
        document.getElementById("percentualeTotaleComplessivo").innerText = percentualeTotaleComplessivo;

        // Mostra le sezioni dei risultati e delle schede
        document.getElementById("risultati-container").style.display = "block";
        document.getElementById("schede-container").style.display = "block";
    });
});
