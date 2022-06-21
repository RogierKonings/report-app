export interface TransactionField {
  transactionReference: number;
  errors: Array<TransactionError>;
}

export interface TransactionError {
  message: TransactionErrorMessages;
}

export enum TransactionErrorMessages {
  TransactionReferenceNotUnique = 'Transaction Reference is not an unique value.',
  TransactionReferenceNotValidNumber = 'Transaction Reference is not a valid number.',
  AccountNumberNotValidIban = 'Account Number is not a valid Iban.',
  StartBalanceNotValidNumber = 'Start Balance is not a valid number.',
  MutationNotValidNumber = 'Mutation is not a valid number.',
  EndBalanceNotValidNumber = 'End Balance is not a valid number.',
  EndBalanceNotValidCalculation = 'The calculation of the end balance is not valid.'
}
