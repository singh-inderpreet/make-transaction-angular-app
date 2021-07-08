import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

import {
  Transaction,
  TransactionIndicator,
  TransactionType,
} from 'src/app/models/transaction.model';
import { ApiMappingService } from 'src/app/services/api-mapping/api-mapping.service';
import * as Mock from 'src/app/mocks/transactions.mock';
import { Transfer } from 'src/app/models/transfer.model';
import { ManageUserService } from 'src/app/services/manage-user/manage-user.service';

@Component({
  selector: 'app-transactions-history',
  template: `
    <div *ngIf="!defaultTransactions?.length" class="spinner">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <div class="th-container">
      <div class="th-header p-2 px-4 w-100">
        <span class="mdi mdi-format-list-bulleted"></span>
        <span>Transactions <b>List</b></span>
      </div>
      <div class="th-content p-2 px-4 w-100">
        <app-filter (inputChange)="onInputChange($event)"></app-filter>
        <div class="scroll-container">
          <ng-container
            *ngFor="let transaction of transactions | sortByDate: 'date'"
          >
            <ng-container
              [ngTemplateOutlet]="transactionTemplate"
              [ngTemplateOutletContext]="{ data: transaction }"
            ></ng-container>
          </ng-container>
        </div>
      </div>
    </div>
    <ng-template #transactionTemplate let-transaction="data">
      <div class="container trans-container">
        <div class="row">
          <app-transaction-item>
            <div
              data-test-hook="transactionColour"
              class="col-sm-1 color"
              [style.borderColor]="transaction.color"
            ></div>
            <div data-test-hook="transactionDate" class="col-sm-3 date">
              <span class="fw-bold">{{ transaction?.displayDate }}</span>
            </div>
            <span class="fw-bold" data-test-hook="transactionMerchantName">{{
              transaction.merchant.name
            }}</span>
            <span data-test-hook="transactionType">{{ transaction.type }}</span>
            <div
              data-test-hook="transactionAmount"
              class="col-sm-3 amount text-end"
            >
              <span [style.color]="transaction.color">{{ transaction?.currency + transaction.amount }}</span>
            </div>
          </app-transaction-item>
        </div>
      </div>
    </ng-template>
  `,
  styles: [
    `
      @import 'src/app/styles/vars';
      :host {
        width: 100%;
        .spinner {
          position: absolute;
          top: 50%;
          left: 50%;
        }
        .th-container {
          .th-header {
            background: $primary-blue;
            display: flex;
            color: #fff;
            span {
              &.mdi {
                font-size: 20px;
                margin-right: 5px;
              }
              margin: auto 0;
            }
          }
          .th-content {
            app-filter {
              ::ng-deep .input-group-text {
                font-size: 25px;
              }
            }
            .scroll-container {
              max-height: 500px;
              overflow: auto;
              margin-top: 15px;
            }
            .trans-container {
              margin: 10px 0px;
              min-height: 50px;
              border-bottom: 1px solid #e9ecef;
              padding-left: 0;
              &:last-child {
                border-bottom: 0;
              }
              .row {
                min-height: 40px;
                app-transaction-item {
                  display: flex;
                  ::ng-deep {
                    &.merchant-details {
                      width: 42%;
                      display: grid;
                      @media only screen and (max-width: 576px) {
                        width: 100%;
                      }
                    }
                  }
                }
                div {
                  margin: auto 0;
                  &.merchant-details {
                    width: 42%;
                    @media only screen and (max-width: 576px) {
                      width: 100%;
                    }
                  }
                }
                .color {
                  border-left: 5px solid transparent;
                  margin: 0;
                  display: flex;
                  span {
                    margin: auto 0;
                  }
                }
              }
            }
          }
        }
        @media only screen and (max-width: 576px) {
          width: 100%;
        }
      }
    `,
  ],
})
export class TransactionsHistoryComponent implements OnInit {
  transactions: Array<Transaction>;
  defaultTransactions: Array<Transaction>;
  private filterValue: string = '';

  constructor(private apiMapping: ApiMappingService, private manageUser: ManageUserService) {
    this.transactions = new Array<Transaction>();
    this.defaultTransactions = new Array<Transaction>();
  }

  ngOnInit(): void {
    this.getTransactionHistory();
  }

  /**
   * Call the Get Transaction API.
   * Fetch data and then call the load method.
   * @memberof TransactionsHistoryComponent
   */
  getTransactionHistory() {
    this.apiMapping.getTransacations().subscribe(
      (data: any) => {
        if (data?.length) {
          this.loadData(data);
        } else {
          this.loadData(Mock.transactionsHistory);
        }
      },
      (error: any) => {
        // Load data from mock
        this.loadData(Mock.transactionsHistory);
      }
    );
  }
  /**
   * Load the historical transactions in local variable.
   * Bind the data to transactions object.
   * @param {*} data
   * @memberof TransactionsHistoryComponent
   */
  loadData(data: any) {
    const arrTransactions: Array<any> = data?.data;
    const _transactions: Array<any> = new Array<any>();
    (arrTransactions || []).forEach((element: any) => {
      const _currency = element.transaction.amountCurrency.currencyCode;
      const date = moment.utc(element.dates.valueDate).format('YYYY-MM-DD');
      const displayDate = moment.utc(element.dates.valueDate).format('MMM. YY');
      const currentTransaction: Transaction = {
        id: element.id,
        merchant: {
          name: element.merchant.name,
          account: element.merchant.accountNumber,
          currency: element.transaction.amountCurrency.currencyCode,
          color: element.categoryCode
        },
        date: date || '',
        displayDate: displayDate,
        color: element.categoryCode,
        indicator:
          element.transaction.creditDebitIndicator ===
          TransactionIndicator.debit
            ? TransactionIndicator.debit
            : TransactionIndicator.credit,
        amount: element.transaction.amountCurrency.amount,
        currency: (_currency === 'EUR' ? '€' : (_currency || 'EUR')),
        type: element.transaction.type,
      };
      _transactions.push(currentTransaction);
    });
    this.transactions = _transactions;
    if (!this.defaultTransactions.length) {
      this.defaultTransactions = [..._transactions]; // Deep clone
    }
  }

  updateTransactions() {
    const filteredData = this.defaultTransactions.filter(
      (element: Transaction) => {
        return (
          element.merchant.name
            .toLowerCase()
            .indexOf((this.filterValue + '').toLowerCase()) !== -1
        );
      }
    );
    this.transactions = [...filteredData];
  }

  /**
   * This is called from the parent component.
   * Whenever a transaction occur, add it as a new transaction to the list.
   * @param {Transfer} data
   * @memberof TransactionsHistoryComponent
   */
  addNewTransaction(data: Transfer) {
    const currentUser = this.manageUser.getUser();
    const date = moment.utc(new Date()).format('YYYY-MM-DD');
    const displayDate = moment.utc(new Date()).format('MMM. YY');
    const transaction: Transaction = {
      id: String(Math.floor((Math.random() * 10000000000) + 1)),
      merchant: {
        name: data.toAccount,
        account: currentUser.account,
        currency: currentUser.currency,
        color: currentUser.color
      },
      date: date || '',
      displayDate: displayDate,
      color: currentUser.color,
      indicator: TransactionIndicator.debit,
      amount: data.amount,
      currency: (currentUser.currency === 'EUR' ? '€' : (currentUser.currency || 'EUR')),
      type: TransactionType.onlineTransfer
    };
    this.defaultTransactions.push({...transaction});
    this.updateTransactions();
  }

  onInputChange(event: any) {
    this.filterValue = event.target.value;
    this.updateTransactions();
  }
}
