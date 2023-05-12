import {TestBed, inject, waitForAsync} from '@angular/core/testing'

import {CSVService} from './csv.service'

import {MT940} from 'src/app/models/mt940.model'

const MT940CSVStub = `Reference,Account Number,Description,Start Balance,Mutation,End Balance
134902,NL90ABNA0585647886,Clothes for Willem de Vries,22.2,+33.21,55.40`

describe('CSVService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [CSVService],
    })
  })

  it('should be created', inject([CSVService], (service: CSVService) => {
    expect(service).toBeTruthy()
  }))

  describe('Create MT940 from CSV', () => {
    it('return MT940 Object in case of valid CSV format', waitForAsync(
      inject([CSVService], (service: CSVService) => {
        const response: Array<MT940> = [
          {
            transactionReference: 134902,
            accountNumber: 'NL90ABNA0585647886',
            description: 'Clothes for Willem de Vries',
            startBalance: 22.2,
            mutation: 33.21,
            endBalance: 55.4,
          },
        ]
        service.parseToMT940List(MT940CSVStub, {delimiter: ','}).subscribe((result) => {
          expect(result).toEqual(response)
        })
      }),
    ))
  })
})
