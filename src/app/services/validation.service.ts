/**
 * Service responsible for validating the different fields of a MT940
 */
import {Injectable} from '@angular/core'

import * as IBAN from 'iban'

import {MT940, ValidationField, ValidationErrorMessages} from '../models'
import {isNumeric, isUniqueValue, isValidEndBalance} from '../utils/validate.utils'

@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  public validateMT940(values: MT940[]): ValidationField[] {
    return values.map((mt940: MT940) => {
      const errors = []
      if (!isUniqueValue(mt940.transactionReference, values)) {
        errors.push({
          message: ValidationErrorMessages.TransactionReferenceNotUnique,
        })
      }
      if (!isNumeric(mt940.transactionReference)) {
        errors.push({
          message: ValidationErrorMessages.TransactionReferenceNotValidNumber,
        })
      }
      if (!IBAN.isValid(mt940.accountNumber)) {
        errors.push({
          message: ValidationErrorMessages.TransactionReferenceNotUnique,
        })
      }
      if (!isNumeric(mt940.startBalance)) {
        errors.push({
          message: ValidationErrorMessages.StartBalanceNotValidNumber,
        })
      }
      if (!isNumeric(mt940.mutation)) {
        errors.push({
          message: ValidationErrorMessages.MutationNotValidNumber,
        })
      }
      if (!isNumeric(mt940.endBalance)) {
        errors.push({
          message: ValidationErrorMessages.EndBalanceNotValidNumber,
        })
      }
      if (!isValidEndBalance(mt940.startBalance, mt940.mutation, mt940.endBalance)) {
        errors.push({
          message: ValidationErrorMessages.EndBalanceNotValidCalculation,
        })
      }
      return {
        transactionReference: mt940.transactionReference,
        errors,
      }
    })
  }
}
