// acconti.js
export function calcolaAcconti({ redditoPrecedente, redditoCorrente, coefficienteRedditivita, aliquotaImposta }) {
  // Calcola il reddito netto del 2023
  const redditoNettoPrecedente = Math.round(redditoPrecedente * coefficienteRedditivita);
  // Calcola l'imposta sostitutiva che sarebbe dovuta per il 2023 (acconto sull’anno successivo)
  const acconto2023 = Math.round(redditoNettoPrecedente * aliquotaImposta);
  // Questa è la somma degli acconti già versati per il 2023 che dovrebbero ridurre il saldo 2024.
  return acconto2023;
}
