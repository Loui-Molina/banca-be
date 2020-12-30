export enum TransactionType {
    // Deposito realizado por el Boludo, puede ser el pago de una apuesta o addicion al balance
    deposit = 'deposit',
    // Extraccion realizada por el boludo puede ser una extraccion de una cuenta o el pago de un premio
    extraction = 'extraction',
    // en caso de robo, imprevisto, etc
    adjust = 'adjust',
}
