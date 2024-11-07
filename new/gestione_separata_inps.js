function calculateGestioneSeparataINPS(redditoImponibile, anno) {
    const aliquota = yearsData[anno].gestione_separata_inps;
    const contributi = redditoImponibile * (aliquota / 100);

    // Saldo
    const saldo = contributi;

    // Acconti (80% for contributions)
    const acconti = saldo * 0.80;

    // You can further split acconti into payment schedules if needed
    return saldo + acconti;
}
