import { User } from './user.model';

export enum TransactionType {
  salaries = 'Salaries',
  onlineTransfer = 'Online Transfer',
  cardPayment = 'Card Payment',
}

export enum TransactionIndicator {
  credit = 'CRDT',
  debit = 'DBIT',
}

export interface Merchant {
  name: string;
  account: string;
  currency?: string;
  color: string;
}

export interface Transaction {
  id: string;
  date?: string;
  color: string;
  type: TransactionType;
  amount: number;
  currency: string;
  merchant: Merchant;
  indicator: TransactionIndicator;
  displayDate: string;
}
