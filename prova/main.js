// main.js

document.addEventListener('DOMContentLoaded', function() {
    const cassaInpsSelect = document.getElementById("cassaInps");
    const opzioniContainer = document.getElementById("opzioniCommercianteArtigiano");
    const form = document.getElementById("calcolatoreForm");
    const downloadButton = document.getElementById("downloadRecap");
    const redditoLordoButtons = document.querySelectorAll('.reddito-buttons button');
    const dettaglioCalcoli = document.getElementById("dettaglioCalcoli");
    const contributiFissiIpoteticiRow = document.getElementById("contributiFissiIpoteticiRow");
    const dettaglioPagamentiTab = document.getElementById("dettaglio-pagamenti-tab");

    const tabs = document.querySelectorAll(".tab");
    const tabContents = document.querySelectorAll(".tab-content");

    // Impostazioni Predefinite
    document.getElementById("annoReddito").value = CONFIG.annoDiRiferimento;
    document.getElementById("annoTitolo").innerText = CONFIG.annoDiRiferimento;
    document.getElementById("aliquotaImposta").value = CONFIG.aliquoteImposta[CONFIG.annoDiRiferimento].impostaSostitutiva;
    document.getElementById("coefficienteRedditivita").innerHTML = CONFIG.coefficienteRedditivita[CONFIG.annoDiRiferimento]
        .map(coeff => `<option value="${coeff}" ${coeff === 86 ? 'selected' : ''}>${coeff}%</option>`)
        .join('');

    document.getElementById("annoRedditoInput").innerText = CONFIG.annoDiRiferimento;

    // Mostra/Nascondi le opzioni aggiuntive per Commercianti e Artigiani
    cassaInpsSelect.addEventListener("change", function() {
        const cassa = cassaInpsSelect.value;
        if (cassa === "inps_commercianti" || cassa === "inps_artigiani") {
            opzioniContainer.style.display = "block";
        } else {
            opzioniContainer.style.display = "none";
            document.getElementById("riduzioneContributi").checked = false;
            document.getElementById("dataApertura").value = "";
        }
    });

    // Funzione per impostare il reddito lordo tramite i bottoni
    redditoLordoButtons.forEach(button => {
        button.addEventListener("click", function() {
            const value = this.getAttribute("data-value");
            document.getElementById("redditoLordo").value = value;
        });
    });

    // Gestione delle schede
    tabs.forEach(tab => {
        tab.addEventListener("click", function() {
            // Rimuovi la classe active da tutte le schede
            tabs.forEach(t => t.classList.remove("active"));
            // Aggiungi la classe active alla scheda cliccata
            this.classList.add("active");

            // Nascondi tutti i contenuti delle schede
            tabContents.forEach(content => content.classList.remove("active"));
            // Mostra il contenuto della scheda selezionata
            const target = this.getAttribute("data-tab") + "-tab";
            document.getElementById(target).classList.add("active");
        });
    });

    // Funzione per caricare dinamicamente il file JS della cassa selezionata
    function loadCassaJS(cassa) {
        switch(cassa) {
            case 'gs_inps':
                return cassa_gs_inps(); // Funzione definita in cassa_gs_inps.js
            case 'inps_commercianti':
                return cassa_inps_commercianti(); // Funzione definita in cassa_inps_commercianti.js
            case 'inps_artigiani':
                return cassa_inps_artigiani(); // Funzione definita in cassa_inps_artigiani.js
            default:
                return null;
        }
    }

    form.addEventListener("submit", function(event) {
        event.preventDefault(); // Previene il comportamento predefinito del form

        // Recupera i valori di input
        const annoReddito = parseInt(document.getElementById("annoReddito").value);
        const cassaInps = document.getElementById("cassaInps").value;
        const riduzioneContributi = document.getElementById("riduzioneContributi").checked;
        const dataApertura = document.getElementById("dataApertura").value;
        const aliquotaImposta = parseFloat(document.getElementById("aliquotaImposta").value);
        const coefficienteRedditivita = parseFloat(document.getElementById("coefficienteRedditivita").value) / 100;
        const redditoLordo = parseInt(document.getElementById("redditoLordo").value);

        // Validazione corretta
        if (
            isNaN(annoReddito) ||
            cassaInps === "" ||
            isNaN(aliquotaImposta) ||
            isNaN(coefficienteRedditivita) ||
            isNaN(redditoLordo) ||
            redditoLordo <= 0
        ) {
            alert("Per favore, compila tutti i campi correttamente.");
            return;
        }

        // Carica la logica specifica della cassa INPS selezionata
        const cassaLogic = loadCassaJS(cassaInps);
        if (cassaLogic) {
            cassaLogic.calculate({
                annoReddito,
                cassaInps,
                riduzioneContributi,
                dataApertura,
                aliquotaImposta,
                coefficienteRedditivita,
                redditoLordo,
                config: CONFIG
            });
        } else {
            alert("Cassa INPS selezionata non supportata.");
        }

        // Mostra le sezioni dei risultati e delle schede
        document.getElementById("risultati-container").style.display = "block";
        document.getElementById("schede-container").style.display = "block";
    });

    downloadButton.addEventListener("click", async function() {
                const { jsPDF } = window.jspdf;
            
                const pdfWidth = 595.28;
                const pdfHeight = 841.89;
            
                const pdf = new jsPDF({
                    orientation: 'p',
                    unit: 'pt',
                    format: [pdfWidth, pdfHeight],
                    compressPdf: true
                });
            
                const options = {
                    backgroundColor: '#FFFFFF', // Imposta lo sfondo bianco
                    scale: 2,
                    useCORS: true,
                    allowTaint: true,
                    logging: true,
                    removeContainer: true
                };
            
                // Funzione per convertire un elemento HTML in immagine e aggiungerlo al PDF
                async function addPageToPDF(element, pdf, addPage = false, drawBackground = null) {
                    if (!element) {
                        console.error('Elemento non trovato per addPageToPDF.');
                        return;
                    }
            
                    // Applica stili per assicurare il rendering corretto
                    element.style.width = pdfWidth + 'pt';
                    element.style.height = pdfHeight + 'pt';
                    element.style.maxWidth = pdfWidth + 'pt';
                    element.style.maxHeight = pdfHeight + 'pt';
                    element.style.margin = '0';
                    element.style.boxSizing = 'border-box';
                    element.style.overflow = 'hidden';
            
                    const canvas = await html2canvas(element, options);
            
                    const imgData = canvas.toDataURL('image/jpeg', 0.95);
                    if (addPage) {
                        pdf.addPage();
                    }
            
                    // Disegna il background se necessario
                    if (typeof drawBackground === 'function') {
                        drawBackground(pdf);
                    }
            
                    pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
            
                    // Ripristina gli stili originali
                    element.style.width = '';
                    element.style.height = '';
                    element.style.maxWidth = '';
                    element.style.maxHeight = '';
                    element.style.margin = '';
                    element.style.boxSizing = '';
                    element.style.overflow = '';
                }
            
                // Funzione per disegnare le righe sulla prima pagina
                function drawLines(pdf) {
                    pdf.setLineWidth(0.5);
                    pdf.setDrawColor(197, 197, 197, 0.2);
            
                    const lineHeight = 25;
                    for (let y = lineHeight; y < pdfHeight; y += lineHeight) {
                        pdf.line(40, y, pdfWidth - 40, y); // Aggiungi margini laterali di 40pt
                    }
                }
            
                // Funzione per disegnare i quadretti sulla seconda pagina
                function drawGrid(pdf) {
                    pdf.setLineWidth(0.5);
                    pdf.setDrawColor(197, 197, 197, 0.2);
            
                    const gridSize = 25;
            
                    // Linee orizzontali
                    for (let y = gridSize; y < pdfHeight; y += gridSize) {
                        pdf.line(40, y, pdfWidth - 40, y); // Aggiungi margini laterali di 40pt
                    }
            
                    // Linee verticali
                    for (let x = 40 + gridSize; x < pdfWidth - 40; x += gridSize) {
                        pdf.line(x, 0, x, pdfHeight);
                    }
                }
            
                // Funzioni per mostrare e ripristinare le schede
                function showOnlyTab(tabId) {
                    tabContents.forEach(content => content.style.display = 'none');
                    const tabElement = document.getElementById(tabId);
                    if (tabElement) {
                        tabElement.style.display = 'block';
                    } else {
                        console.error(`Elemento con ID ${tabId} non trovato.`);
                    }
                }
            
                function resetTabDisplay() {
                    tabContents.forEach(content => content.style.display = '');
                }
            
                // Aggiungi padding agli elementi per i margini interni
                function addPadding(element) {
                    element.style.padding = '40pt'; // Aggiungi padding di 40pt
                    element.style.boxSizing = 'border-box';
                }
            
                function removePadding(element) {
                    element.style.padding = '';
                    element.style.boxSizing = '';
                }
            
                // Cattura la prima pagina con le righe disegnate
                showOnlyTab('come-si-calcolano-tab');
                const firstPageElement = document.getElementById('come-si-calcolano-tab');
                addPadding(firstPageElement);
                await addPageToPDF(firstPageElement, pdf, false, drawLines);
                removePadding(firstPageElement);
            
                // Cattura la seconda pagina con i quadretti disegnati
                showOnlyTab('dettaglio-pagamenti-tab');
                const secondPageElement = document.getElementById('dettaglio-pagamenti-tab');
                addPadding(secondPageElement);
                await addPageToPDF(secondPageElement, pdf, true, drawGrid);
                removePadding(secondPageElement);
            
                // Cattura la terza e quarta pagina (senza background)
                resetTabDisplay(); // Mostra tutti i contenuti per la terza pagina
                const risultatiContainer = document.getElementById('risultati-container');
                if (risultatiContainer) {
                    risultatiContainer.style.display = 'block';
                } else {
                    console.error('Elemento risultati-container non trovato.');
                }
                showOnlyTab('scadenza-pagamenti-tab');
                const thirdPageElement = risultatiContainer;
                addPadding(thirdPageElement);
                await addPageToPDF(thirdPageElement, pdf, true);
                removePadding(thirdPageElement);
            
                const fourthPageElement = document.getElementById('scadenza-pagamenti-tab');
                addPadding(fourthPageElement);
                await addPageToPDF(fourthPageElement, pdf);
                removePadding(fourthPageElement);
            
                // Ripristina la visualizzazione originale
                resetTabDisplay();
            
                // Scarica il PDF (compatibile con dispositivi mobili)
                const pdfBlob = pdf.output('blob');
                const blobUrl = URL.createObjectURL(pdfBlob);
                const link = document.createElement('a');
                link.href = blobUrl;
                link.download = 'Recap_Regime_Forfettario.pdf';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(blobUrl);
            });
             
        });    
