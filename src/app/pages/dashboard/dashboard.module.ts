import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { MakeTransferModule } from 'src/app/components/make-transfer/make-transfer.module';
import { TransactionsHistoryModule } from 'src/app/components/transactions-history/transactions-history.module';

@NgModule({
  declarations: [DashboardComponent],
  imports: [CommonModule, MakeTransferModule, TransactionsHistoryModule],
  exports: [DashboardComponent],
})
export class DashboardModule {}
