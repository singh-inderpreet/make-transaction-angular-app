import { SortByDatePipe } from './sort.pipe';
import * as moment from 'moment';

describe('SortByDatePipe', () => {
  let mockData = [
    {
      "categoryCode": "#12a580",
      "date": "2011-10-12",
      "transaction": {
        "amountCurrency": {
          "amount": "82.02",
          "currencyCode": "EUR"
        },
        "type": "Card Payment",
        "creditDebitIndicator": "DBIT"
      },
      "merchant": {
        "name": "The New Lounge",
        "accountNumber": "SI64397745065188826"
      }
    },
    {
      "categoryCode": "#12a580",
      "date": "2009-10-02",
      "transaction": {
        "amountCurrency": {
          "amount": "82.02",
          "currencyCode": "EUR"
        },
        "type": "Card Payment",
        "creditDebitIndicator": "DBIT"
      },
      "merchant": {
        "name": "The Tea Lounge",
        "accountNumber": "SI64397745065188826"
      }
    }
  ];
  it('create an instance', () => {
    const pipe = new SortByDatePipe();
    expect(pipe).toBeTruthy();
  });
  it('create an instance', () => {
    const pipe = new SortByDatePipe();
    const _originalData = {...mockData};
    expect(pipe.transform(mockData, 'date')).toEqual([_originalData[1], _originalData[0]]);
  });
});
