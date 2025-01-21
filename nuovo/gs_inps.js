// gs_inps.js
export function calcolaContributi({ redditoNetto, annoReddito }) {
  // Definizione delle percentuali per l'anno di riferimento
  const aliquoteContributi = {
    2023: 25.00, // 25% per il 2023
    2024: 26.23, // 26.23% per il 2024
    2025: 26.50  // 26.50% per il 2025
  };

  const aliquotaGsInps = aliquoteContributi[annoReddito] ? aliquoteContributi[annoReddito] / 100 : 26.23 / 100;

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
