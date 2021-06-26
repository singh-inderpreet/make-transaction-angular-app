import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransactionsHistoryComponent } from 'src/app/components/transactions-history/transactions-history.component';
import { Transfer } from 'src/app/models/transfer.model';
import { SortByDatePipe } from 'src/app/pipes/sort.pipe';
import { ApiMappingService } from 'src/app/services/api-mapping/api-mapping.service';

import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  const mockData: Transfer = {
    fromAccount: 'My Personal Account',
    toAccount: 'Backbase',
    amount: 999,
    currency: 'EUR',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardComponent, TransactionsHistoryComponent, SortByDatePipe],
      imports: [HttpClientModule],
      providers: [ApiMappingService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should load background', () => {
    expect(
      fixture.nativeElement.querySelector('[data-test="background"]')
    ).toBeTruthy();
  });
  it('should add new transaction', () => {
    component.updateTransactionHistory(mockData);
    expect(
      component.transactionHistory?.defaultTransactions.length === 1
    ).toBeTruthy();
  });
});
