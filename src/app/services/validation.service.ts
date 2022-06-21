/**
 * Service responsible for validating the different fields of a MT940
 */
import { Injectable } from '@angular/core';

import * as IBAN from 'iban';

import { MT940 } from 'src/app/models/mt940.model';
import { ValidationField, ValidationErrorMessages } from 'src/app/models/validation.model';
import { isUniqueValue, isValidEndBalance, isNumber } from '../utils/validate.utils';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  public validateMT940(values: Array<MT940>): Array<ValidationField> {

    return values.map((mt940: MT940) => {
      const errors = [];
      if (!isUniqueValue(mt940.transactionReference, values)) {
        errors.push({
          message: ValidationErrorMessages.TransactionReferenceNotUnique
        });
      }
      if (!isNumber(mt940.transactionReference)) {
        errors.push({
          message: ValidationErrorMessages.TransactionReferenceNotValidNumber
        });
      }
      if (!IBAN.isValid(mt940.accountNumber)) {
        errors.push({
          message: ValidationErrorMessages.TransactionReferenceNotUnique
        });
      }
      if (!isNumber(mt940.startBalance)) {
        errors.push({
          message: ValidationErrorMessages.StartBalanceNotValidNumber
        });
      }
      if (!isNumber(mt940.mutation)) {
        errors.push({
          message: ValidationErrorMessages.MutationNotValidNumber
        });
      }
      if (!isNumber(mt940.endBalance)) {
        errors.push({
          message: ValidationErrorMessages.EndBalanceNotValidNumber
        });
      }
      if (
        !isValidEndBalance(mt940)) {
          errors.push({
            message: ValidationErrorMessages.EndBalanceNotValidCalculation
          });
      }
      return {
        transactionReference: mt940.transactionReference,
        errors
      }
    });
  }

}
