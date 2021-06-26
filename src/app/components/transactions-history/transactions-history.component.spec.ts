import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Transaction } from 'src/app/models/transaction.model';
import { SortByDatePipe } from 'src/app/pipes/sort.pipe';
import { ApiMappingService } from 'src/app/services/api-mapping/api-mapping.service';

import { TransactionsHistoryComponent } from './transactions-history.component';

describe('TransactionsHistoryComponent', () => {
  let component: TransactionsHistoryComponent;
  let fixture: ComponentFixture<TransactionsHistoryComponent>;
  const mockData = [
    {
      "categoryCode": "#12a580",
      "dates": {
        "valueDate": 1600387200000
      },
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
    },
    {
      "categoryCode": "#12a580",
      "dates": {
        "valueDate": 1602187200000
      },
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
    }
  ];
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionsHistoryComponent, SortByDatePipe ],
      imports: [HttpClientModule],
      providers: [ApiMappingService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionsHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should fetch transactions data', () => {
    let service = fixture.debugElement.injector.get(ApiMappingService);
    spyOn(service, "getTransacations").and.callFake(() => {
      return of({ "data": mockData });
    });
    component.loadData({ "data": mockData });
    expect(component.defaultTransactions.length).toBeTruthy();
  });
  it('should sort transactions data in ascending order', () => {
    let service = fixture.debugElement.injector.get(ApiMappingService);
    spyOn(service, "getTransacations").and.callFake(() => {
      return of({ "data": mockData });
    });
    component.loadData({ "data": mockData });
    const obj1: Transaction = component.defaultTransactions[0];
    const obj2: Transaction = component.defaultTransactions[1];
    let date1: Date = new Date(obj1.date || '');
    let date2: Date = new Date(obj2.date || '');
    expect(date1 < date2).toBeTruthy();
  });
  it('should filter transactions data with filter value', () => {
    let service = fixture.debugElement.injector.get(ApiMappingService);
    spyOn(service, "getTransacations").and.callFake(() => {
      return of({ "data": mockData });
    });
    component.loadData({ "data": mockData });
    component.onInputChange({ target: {
      value: 'Tea'
    }});
    expect(component.transactions.length === 1 && component.transactions[0].merchant.name === mockData[0].merchant.name).toBeTruthy();
  });
});
