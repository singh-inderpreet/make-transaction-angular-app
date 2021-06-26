export interface Transfer {
  fromAccount: string;
  toAccount: string;
  amount: number;
  currency?: string;
}
