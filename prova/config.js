// config.js

const CONFIG = {
    annoDiRiferimento: 2024,
    aliquoteImposta: {
        2024: {
            impostaSostitutiva: 0.05, // 5%
            impostaSostitutivaAltro: 0.15 // 15%, se necessario
        },
        // Aggiungi altri anni se necessario
    },
    coefficienteRedditivita: {
        2024: [86, 78, 67, 40],
        // Aggiungi altri anni se necessario
    },
    contributiINPS: {
        gs_inps: {
            aliquota: 0.2623, // 26.23%
            riduzione: 1 // Nessuna riduzione per questa cassa
        },
        inps_commercianti: {
            contributiFissiAnnui: 4515,
            aliquotaVariabile: 0.2448, // 24.48%
            riduzione: 0.65 // 35% di riduzione
        },
        inps_artigiani: {
            contributiFissiAnnui: 4427,
            aliquotaVariabile: 0.24, // 24%
            riduzione: 0.65 // 35% di riduzione
        }
    },
    sogliaReddito: 18415
};
