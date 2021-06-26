import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionItemComponent } from '../transaction-item/transaction-item.component';
import { TransactionsHistoryComponent } from './transactions-history.component';
import { SortByDatePipe } from 'src/app/pipes/sort.pipe';
import { FilterComponent } from '../filter/filter.component';

@NgModule({
  declarations: [
    FilterComponent,
    SortByDatePipe,
    TransactionItemComponent,
    TransactionsHistoryComponent,
  ],
  imports: [CommonModule],
  exports: [TransactionsHistoryComponent],
})
export class TransactionsHistoryModule {}
