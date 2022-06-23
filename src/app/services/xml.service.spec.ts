import { TestBed, inject, waitForAsync } from '@angular/core/testing';

import { XMLService } from './xml.service';

import { MT940 } from '../models';

const ValidMT940XMLStub = `<records>
  <record reference="164702">
    <accountNumber>NL46ABNA0625805417</accountNumber>
    <description>Flowers for Rik Dekker</description>
    <startBalance>81.89</startBalance>
    <mutation>+5.99</mutation>
    <endBalance>87.88</endBalance>
  </record>
  <record reference="189177">
    <accountNumber>NL27SNSB0917829871</accountNumber>
    <description>Subscription for Erik Dekker</description>
    <startBalance>5429</startBalance>
    <mutation>-939</mutation>
    <endBalance>6368</endBalance>
  </record>
</records>`;

const InvalidMT940XMLStub = `<records>
  <record reference="164702">
    <accountNumber>NL46ABNA0625805417</accountNumber>
    <description>Flowers for Rik Dekker</description>
    <startBalance>81.89</startBalance>
    <mutation>+5.99</mutation>
    <endBalance>87.88</endBalance>`;

describe('XMLService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [XMLService],
    });
  });

  it('should be created', inject([XMLService], (service: XMLService) => {
    expect(service).toBeTruthy();
  }));

  describe('Create MT940 from XML', () => {
    it('return MT940 Object in case of valid XML format', waitForAsync(
      inject([XMLService], (service: XMLService) => {
        const response: MT940[] = [
          {
            transactionReference: 164702,
            accountNumber: 'NL46ABNA0625805417',
            description: 'Flowers for Rik Dekker',
            startBalance: 81.89,
            mutation: 5.99,
            endBalance: 87.88,
          },
          {
            transactionReference: 189177,
            accountNumber: 'NL27SNSB0917829871',
            description: 'Subscription for Erik Dekker',
            startBalance: 5429,
            mutation: -939,
            endBalance: 6368,
          },
        ];
        service
          .parseToMT940List(ValidMT940XMLStub, {
            attrkey: 'attribute',
          })
          .subscribe(result => {
            expect(result).toEqual(response);
          });
      })
    ));

    it('should throw an error in case of invalid CSV format', waitForAsync(
      inject([XMLService], (service: XMLService) => {
        service
          .parseToMT940List(InvalidMT940XMLStub, {
            attrkey: 'attribute',
          })
          .subscribe({
            error: err =>
              expect(err).toEqual(
                new Error('Unable to parse the text/xml type')
              ),
          });
      })
    ));
  });
});
