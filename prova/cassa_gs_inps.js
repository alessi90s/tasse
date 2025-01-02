// cassa_gs_inps.js

function cassa_gs_inps() {
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

            // Calcolo dei Contributi INPS per Gestione Separata
            const aliquotaGsInps = config.contributiINPS.gs_inps.aliquota;
            const contributiInps = Math.round(redditoNetto * aliquotaGsInps);
            const accontoInps = Math.round(contributiInps * 0.80);

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
            document.getElementById("contributiFissiOutput").innerText = "N/A"; // Non applicabile per GS INPS
            document.getElementById("annoRedditoOutput5").innerText = annoReddito;
            document.getElementById("contributiVariabiliOutput").innerText = "N/A"; // Non applicabile per GS INPS
            document.getElementById("totaleContributiInpsOutput").innerText = contributiInps.toLocaleString('it-IT') + "€";
            document.getElementById("contributiFissiIpoteticiOutput").innerText = "N/A"; // Non applicabile per GS INPS
            document.getElementById("annoAccontoInps").innerText = annoReddito + 1;
            document.getElementById("accontoInpsOutput").innerText = accontoInps.toLocaleString('it-IT') + "€";

            // Gestione della visualizzazione delle righe
            contributiFissiIpoteticiRow.style.display = "none";
            document.getElementById("contributiInpsRow").style.display = "table-row";
            document.getElementById("contributiFissiRow").style.display = "none";
            document.getElementById("contributiVariabiliRow").style.display = "none";
            document.getElementById("totaleContributiInpsRow").style.display = "none";

            // Calcolo delle Scadenze
            const annoScadenza = annoReddito + 1;
            document.getElementById("annoScadenzaGiugno").innerText = annoScadenza;
            document.getElementById("annoScadenzaNovembre").innerText = annoScadenza;

            document.getElementById("annoScadenzaGiugnoDettaglio").innerText = annoScadenza;
            document.getElementById("annoScadenzaNovembreDettaglio").innerText = annoScadenza;
            document.getElementById("annoAccontoImpostaDettaglio").innerText = annoReddito + 1;
            document.getElementById("annoAccontoImpostaDettaglio2").innerText = annoReddito + 1;
            document.getElementById("annoAccontoInpsDettaglio").innerText = annoReddito + 1;

            // Popola la sezione "Come si Calcolano"
            let dettaglioTesto = `In regime forfettario paghi l'imposta sostitutiva, che nel tuo caso è del ${(aliquotaImposta * 100).toFixed(0)}%.<br><br>`;
            dettaglioTesto += `Quindi paghi il <strong><span class="highlight-yellow"> ${(aliquotaImposta * 100).toFixed(0)}% di imposta e il ${(config.contributiINPS.gs_inps.aliquota * 100).toFixed(0)}% di contributi INPS </span></strong> sul tuo incassato per il coefficiente di redditività (${redditoNetto.toLocaleString('it-IT')}€).<br><br>`;
            dettaglioTesto += `${redditoLordo.toLocaleString('it-IT')}€ x ${(coefficienteRedditivita * 100).toFixed(0)}% = <strong>${redditoNetto.toLocaleString('it-IT')}€ (reddito netto imponibile)</strong>`;
            dettaglioTesto += `<p><strong>Nota bene:</strong></p>`;
            dettaglioTesto += `<ul><li>Se nell'anno di riferimento hai versato dei contributi, questi vengono detratti dal tuo reddito netto.</li>`;
            dettaglioTesto += `<li>Se avevi versato gli acconti nell'anno precedente, questi vengono scalati dai saldi che devi versare quest'anno.</li></ul>`;
            dettaglioTesto += `<h3>Esempio di calcolo:</h3>`;
            dettaglioTesto += `<p>Per un incasso di ${redditoLordo.toLocaleString('it-IT')}€, il ${(coefficienteRedditivita * 100).toFixed(0)}% corrisponde a ${redditoNetto.toLocaleString('it-IT')}€. Su questo importo, dovrai pagare:</p>`;
            
            dettaglioTesto += `<ul>`;
            dettaglioTesto += `<li>Imposta sostitutiva: ${(aliquotaImposta * 100).toFixed(0)}% su ${redditoNetto.toLocaleString('it-IT')}€, che equivale a <strong><span class="highlight-yellow">${impostaSostitutiva.toLocaleString('it-IT')}€</span></strong>.</li>`;
            dettaglioTesto += `<li>Contributi INPS: ${(config.contributiINPS.gs_inps.aliquota * 100).toFixed(0)}% su ${redditoNetto.toLocaleString('it-IT')}€, che equivale a <strong><span class="highlight-yellow">${contributiInps.toLocaleString('it-IT')}€</span></strong>.</li>`;
            dettaglioTesto += `</ul>`;
            
            const totaleSaldo = impostaSostitutiva + contributiInps;
            dettaglioTesto += `<p>Quindi, a livello di saldo, pagherai <strong><span class="highlight-yellow">${totaleSaldo.toLocaleString('it-IT')}€</span></strong> (di cui <span class="highlight-yellow">${impostaSostitutiva.toLocaleString('it-IT')}€</span> di imposta e <span class="highlight-yellow">${contributiInps.toLocaleString('it-IT')}€</span> di contributi).</p>`;
            
            // Acconti
            const accontoImposta = impostaSostitutiva;
            const accontoInpsCalc = Math.round(contributiInps * 0.80);
            const totaleAcconti = accontoImposta + accontoInpsCalc;
            dettaglioTesto += `<h3>Acconti:</h3>`;
            dettaglioTesto += `<p>Oltre al saldo, dovrai versare anche gli acconti per l’anno successivo:</p>`;
            dettaglioTesto += `<ul>`;
            dettaglioTesto += `<li>Imposta sostitutiva: pagherai il 100% dell'importo del saldo come acconto, quindi ulteriori <strong><span class="highlight-blue">${accontoImposta.toLocaleString('it-IT')}€</span></strong>.</li>`;
            dettaglioTesto += `<li>Contributi INPS: pagherai l’80% dell'importo dei contributi come acconto, quindi <strong><span class="highlight-blue">${accontoInpsCalc.toLocaleString('it-IT')}€</span></strong>.</li>`;
            dettaglioTesto += `</ul>`;
            
            const totaleComplessivo = totaleSaldo + totaleAcconti;
            dettaglioTesto += `<h3>Totale complessivo:</h3>`;
            dettaglioTesto += `<p>Saldo totale: <strong><span class="highlight-yellow">${totaleSaldo.toLocaleString('it-IT')}€</span></strong> (di cui <span class="highlight-yellow">${impostaSostitutiva.toLocaleString('it-IT')}€</span> di imposta e <span class="highlight-yellow">${contributiInps.toLocaleString('it-IT')}€</span> di contributi)</p>`;
            dettaglioTesto += `<p>Acconti totali: <strong><span class="highlight-blue">${totaleAcconti.toLocaleString('it-IT')}€</span></strong> (di cui <span class="highlight-blue">${accontoImposta.toLocaleString('it-IT')}€</span> di imposta e <span class="highlight-blue">${accontoInpsCalc.toLocaleString('it-IT')}€</span> di contributi)</p>`;
            dettaglioTesto += `<p>Importo complessivo (saldo + acconti): <strong><u>${totaleComplessivo.toLocaleString('it-IT')}€</u></strong></p>`;
            
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

                if (cassaInps === "gs_inps") {
                    document.getElementById("detContributiInpsTitoloPagamenti").innerText = "Gestione Separata";
                    document.getElementById("detRedditoNettoInpsPagamenti").innerText = redditoNetto.toLocaleString('it-IT');
                    document.getElementById("detAliquotaContributivaPagamenti").innerText = "26%";
                    document.getElementById("detContributiInpsCalcolatiPagamenti").innerText = contributiInps.toLocaleString('it-IT');
                } else {
                    let aliquotaVariabileEffettiva = aliquotaVariabile * (riduzioneContributi ? 0.65 : 1) * 100;
                    aliquotaVariabileDisplay = Math.round(aliquotaVariabileEffettiva) + "%";
                    document.getElementById("detContributiInpsTitoloPagamenti").innerText = cassaInps === "inps_commercianti" ? "INPS Commercianti" : "INPS Artigiani";
                    document.getElementById("detRedditoNettoInpsPagamenti").innerText = (redditoNetto - sogliaReddito).toLocaleString('it-IT');
                    document.getElementById("detAliquotaContributivaPagamenti").innerText = aliquotaVariabileDisplay;
                    document.getElementById("detContributiInpsCalcolatiPagamenti").innerText = contributiVariabili.toLocaleString('it-IT');
                }

                // Calcolo dei Saldi e Acconti
                document.getElementById("detSaldoImpostaPagamenti").innerText = impostaSostitutiva.toLocaleString('it-IT');
                document.getElementById("detAccontoImpostaPagamenti").innerText = accontoImposta.toLocaleString('it-IT');
                document.getElementById("detPrimaRataImpostaPagamenti").innerText = Math.round(accontoImposta / 2).toLocaleString('it-IT');
                document.getElementById("detSecondaRataImpostaPagamenti").innerText = Math.round(accontoImposta / 2).toLocaleString('it-IT');

                if (cassaInps !== "gs_inps") {
                    document.getElementById("detSaldoContributiPagamenti").innerText = (Number(contributiFissiSulAnno) + Number(contributiVariabili)).toLocaleString('it-IT');
                    document.getElementById("detAccontoContributiPagamenti").innerText = Math.round(accontoInps).toLocaleString('it-IT');
                    document.getElementById("detPrimaRataContributiPagamenti").innerText = Math.round(accontoInps / 2).toLocaleString('it-IT');
                    document.getElementById("detSecondaRataContributiPagamenti").innerText = Math.round(accontoInps / 2).toLocaleString('it-IT');
                    document.getElementById("detContributiInpsTipoPagamenti").innerText = cassaInps === "inps_commercianti" ? "Commercianti" : "Artigiani";
                } else {
                    document.getElementById("detSaldoContributiPagamenti").innerText = contributiInps.toLocaleString('it-IT');
                    document.getElementById("detAccontoContributiPagamenti").innerText = Math.round(accontoInps).toLocaleString('it-IT');
                    document.getElementById("detPrimaRataContributiPagamenti").innerText = Math.round(accontoInps / 2).toLocaleString('it-IT');
                    document.getElementById("detSecondaRataContributiPagamenti").innerText = Math.round(accontoInps / 2).toLocaleString('it-IT');
                    document.getElementById("detContributiInpsTipoPagamenti").innerText = "Gestione Separata";
                }
        }
    };
}
