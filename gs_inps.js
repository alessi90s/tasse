// gs_inps.js
export function calcolaContributi({ redditoNetto }) {
  // Parametri per Gestione Separata
  const aliquotaGsInps = 26.23 / 100;
  
  const contributiInps = Math.round(redditoNetto * aliquotaGsInps);
  const accontoInps = Math.round(contributiInps * 0.80);
  
  return {
    contributiFissi: 0,
    contributiVariabili: 0,
    contributiInps,
    accontoInps,
    contributiFissiIpotetici: 0,
    contributiFissiSulAnno: contributiInps,
    importiRate: {}
  };
}
