import {TestBed, inject} from '@angular/core/testing'

import {ValidationService} from './validation.service'

import {MT940, ValidationField, ValidationErrorMessages} from '../models'

const UniqueTransactionReferenceStub: MT940[] = [
  {
    transactionReference: 136329,
    accountNumber: 'NL93ABNA0585619023',
    description: 'Clothes from Dani�l Bakker',
    startBalance: 81.7,
    mutation: -43.41,
    endBalance: 38.29,
  },
  {
    transactionReference: 187928,
    accountNumber: 'NL43AEGO0773393871',
    description: 'Flowers from Richard Theu�',
    startBalance: 101.01,
    mutation: -30.45,
    endBalance: 70.56,
  },
  {
    transactionReference: 163434,
    accountNumber: 'NL90ABNA0585647886',
    description: 'Flowers from Jan de Vries',
    startBalance: 71.87,
    mutation: -16.05,
    endBalance: 55.82,
  },
]

const NotUniqueTransactionReferenceStub: MT940[] = [
  {
    transactionReference: 156108,
    accountNumber: 'NL69ABNA0433647324',
    description: 'Flowers from Erik de Vries',
    startBalance: 13.92,
    mutation: -7.25,
    endBalance: 6.67,
  },
  {
    transactionReference: 112806,
    accountNumber: 'NL93ABNA0585619023',
    description: 'Subscription from Rik Theu�',
    startBalance: 77.29,
    mutation: -23.99,
    endBalance: 53.3,
  },
  {
    transactionReference: 181631,
    accountNumber: 'NL27SNSB0917829871',
    description: 'Tickets for Jan King',
    startBalance: 60.83,
    mutation: 41.96,
    endBalance: 102.79,
  },
  {
    transactionReference: 147132,
    accountNumber: 'NL56RABO0149876948',
    description: 'Subscription for Richard Dekker',
    startBalance: 103.65,
    mutation: 2.58,
    endBalance: 106.23,
  },
  {
    transactionReference: 112806,
    accountNumber: 'NL91RABO0315273637',
    description: 'Candy for Willem Theu�',
    startBalance: 52.21,
    mutation: -33.21,
    endBalance: 19,
  },
]

const NotNumberTransactionReferenceStub: unknown[] = [
  {
    transactionReference: '112806x',
    accountNumber: 'NL91RABO0315273637',
    description: 'Candy for Willem Theu�',
    startBalance: 52.21,
    mutation: -33.21,
    endBalance: 19,
  },
]

const StartBalanceNumberStub: MT940[] = [
  {
    transactionReference: 112806,
    accountNumber: 'NL91RABO0315273637',
    description: 'Candy for Willem Theu�',
    startBalance: 52.21,
    mutation: -33.21,
    endBalance: 19,
  },
]

const StartBalanceNullStub: unknown[] = [
  {
    transactionReference: 112806,
    accountNumber: 'NL91RABO0315273637',
    description: 'Candy for Willem Theu�',
    startBalance: null,
    mutation: -33.21,
    endBalance: 19,
  },
]

const MutationEmptyStringStub: unknown[] = [
  {
    transactionReference: 112806,
    accountNumber: 'NL91RABO0315273637',
    description: 'Candy for Willem Theu�',
    startBalance: 52.21,
    mutation: '',
    endBalance: 19,
  },
]

const EndBalanceStringStub: unknown[] = [
  {
    transactionReference: 112806,
    accountNumber: 'NL91RABO0315273637',
    description: 'Candy for Willem Theu�',
    startBalance: 52.21,
    mutation: -33.21,
    endBalance: '19k',
  },
]

const EndBalanceCorrectStub: MT940[] = [
  {
    transactionReference: 134902,
    accountNumber: 'NL90ABNA0585647886',
    description: 'Clothes for Willem de Vries',
    startBalance: 22.2,
    mutation: 33.21,
    endBalance: 55.41,
  },
  {
    transactionReference: 136329,
    accountNumber: 'NL93ABNA0585619023',
    description: 'Clothes from Dani�l Bakker',
    startBalance: 81.7,
    mutation: -43.41,
    endBalance: 38.29,
  },
  {
    transactionReference: 187928,
    accountNumber: 'NL43AEGO0773393871',
    description: 'Flowers from Richard Theu�',
    startBalance: 101.01,
    mutation: -30.45,
    endBalance: 70.56,
  },
  {
    transactionReference: 163434,
    accountNumber: 'NL90ABNA0585647886',
    description: 'Flowers from Jan de Vries',
    startBalance: 71.87,
    mutation: -16.05,
    endBalance: 55.82,
  },
]

const EndBalanceNotCorrectStub: MT940[] = [
  {
    transactionReference: 134902,
    accountNumber: 'NL90ABNA0585647886',
    description: 'Clothes for Willem de Vries',
    startBalance: 22.2,
    mutation: 33.21,
    endBalance: 55.4,
  },
  {
    transactionReference: 136329,
    accountNumber: 'NL93ABNA0585619023',
    description: 'Clothes from Dani�l Bakker',
    startBalance: 81.7,
    mutation: -43.41,
    endBalance: 38.26,
  },
  {
    transactionReference: 187928,
    accountNumber: 'NL43AEGO0773393871',
    description: 'Flowers from Richard Theu�',
    startBalance: 101.01,
    mutation: -30.45,
    endBalance: 70.57,
  },
  {
    transactionReference: 163434,
    accountNumber: 'NL90ABNA0585647886',
    description: 'Flowers from Jan de Vries',
    startBalance: 71.87,
    mutation: -16.05,
    endBalance: 55.83,
  },
]

describe('ValidationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [ValidationService],
    })
  })

  it('should be created', inject([ValidationService], (service: ValidationService) => {
    expect(service).toBeTruthy()
  }))

  describe('Validates MT940', () => {
    describe('Transaction Reference', () => {
      it('should return empty errors when unique', inject([ValidationService], (service: ValidationService) => {
        const results: ValidationField[] = service.validateMT940(UniqueTransactionReferenceStub)
        results.forEach((value: ValidationField) => expect(value.errors.length).toEqual(0))
      }))

      it('should return proper error message if not unique', inject(
        [ValidationService],
        (service: ValidationService) => {
          const results: ValidationField[] = service.validateMT940(NotUniqueTransactionReferenceStub)
          expect(results[1].errors[0].message).toEqual(ValidationErrorMessages.TransactionReferenceNotUnique)
          expect(results[4].errors[0].message).toEqual(ValidationErrorMessages.TransactionReferenceNotUnique)
        },
      ))

      it('should return proper error message if not a number', inject(
        [ValidationService],
        (service: ValidationService) => {
          const results: ValidationField[] = service.validateMT940(NotNumberTransactionReferenceStub as MT940[])
          expect(results[0].errors[0].message).toEqual(ValidationErrorMessages.TransactionReferenceNotValidNumber)
        },
      ))
    })

    describe('Start Balance, Mutation, End Balance', () => {
      it('should return empty errors if a number', inject([ValidationService], (service: ValidationService) => {
        const results: ValidationField[] = service.validateMT940(StartBalanceNumberStub)
        results.forEach((value: ValidationField) => expect(value.errors.length).toEqual(0))
      }))

      it('should return proper error messages if not a number', inject(
        [ValidationService],
        (service: ValidationService) => {
          const resultsStartBalance: ValidationField[] = service.validateMT940(StartBalanceNullStub as MT940[])
          expect(resultsStartBalance[0].errors[0].message).toEqual(ValidationErrorMessages.StartBalanceNotValidNumber)
          expect(resultsStartBalance[0].errors[1].message).toEqual(
            ValidationErrorMessages.EndBalanceNotValidCalculation,
          )

          const resultsMutation: ValidationField[] = service.validateMT940(MutationEmptyStringStub as MT940[])
          expect(resultsMutation[0].errors[0].message).toEqual(ValidationErrorMessages.MutationNotValidNumber)
          expect(resultsStartBalance[0].errors[1].message).toEqual(
            ValidationErrorMessages.EndBalanceNotValidCalculation,
          )

          const resultsEndBalance: ValidationField[] = service.validateMT940(EndBalanceStringStub as MT940[])
          expect(resultsEndBalance[0].errors[0].message).toEqual(ValidationErrorMessages.EndBalanceNotValidNumber)
          expect(resultsStartBalance[0].errors[1].message).toEqual(
            ValidationErrorMessages.EndBalanceNotValidCalculation,
          )
        },
      ))

      it('should return empty errors message if end balance is correct', inject(
        [ValidationService],
        (service: ValidationService) => {
          const results: ValidationField[] = service.validateMT940(EndBalanceCorrectStub)
          results.forEach((value: ValidationField) => expect(value.errors.length).toEqual(0))
        },
      ))

      it('should return proper error message if end balance is not correct', inject(
        [ValidationService],
        (service: ValidationService) => {
          const resultsEndBalance: ValidationField[] = service.validateMT940(EndBalanceNotCorrectStub)
          expect(resultsEndBalance[0].errors[0].message).toEqual(ValidationErrorMessages.EndBalanceNotValidCalculation)
          expect(resultsEndBalance[1].errors[0].message).toEqual(ValidationErrorMessages.EndBalanceNotValidCalculation)
          expect(resultsEndBalance[2].errors[0].message).toEqual(ValidationErrorMessages.EndBalanceNotValidCalculation)
          expect(resultsEndBalance[3].errors[0].message).toEqual(ValidationErrorMessages.EndBalanceNotValidCalculation)
        },
      ))
    })
  })
})
