import { Component, OnInit, ViewChild } from '@angular/core';
import { TransactionsHistoryComponent } from 'src/app/components/transactions-history/transactions-history.component';
import { Transfer } from 'src/app/models/transfer.model';
import { ManageUserService } from 'src/app/services/manage-user/manage-user.service';

@Component({
  selector: 'app-dashboard',
  template: `
    <div class="container-fluid dash-container">
      <div class="background-image" data-test="background"></div>
      <div class="row d-row">
        <div class="col-sm-4 d-col">
          <div class="widget-container to-right">
            <app-make-transfer
              (updateAfterSubmit)="updateTransactionHistory($event)"
            ></app-make-transfer>
          </div>
        </div>
        <div class="col-sm-8 d-col">
          <div class="widget-container to-left">
            <app-transactions-history #transactionHistory></app-transactions-history>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      @import 'src/app/styles/vars';
      :host {
        .dash-container {
          position: relative;
          min-height: $content-height;
          .background-image {
            position: absolute;
            width: 100%;
            height: 100%;
            left: 0;
            top: 0;
            -webkit-filter: blur(2px);
            -moz-filter: blur(2px);
            -o-filter: blur(2px);
            -ms-filter: blur(2px);
            filter: blur(2px);
            z-index: -1;
            background-image: url(/../../assets/background.jpg);
            background-repeat: no-repeat;
            background-size: cover;
          }
          .d-row {
            min-height: $content-height;
            .d-col {
              position: relative;
            }
            .widget-container {
              display: flex;
              flex-wrap: wrap;
              min-height: 300px;
              background: #fff;
              position: absolute;
              top: $dashboard-content-top;
              margin: 20px 0;
              border-radius: 10px;
              overflow: hidden;
              width: 70%;
              &.to-left {
                left: 20px;
              }
              &.to-right {
                right: 20px;
              }
            }
            @media only screen and (max-width: 576px) {
              min-height: auto;
              .widget-container {
                width: 100%;
                position: relative;
                margin: 20px 0;
                left: 0 !important;
                right: 0 !important;
              }
            }
          }
        }
      }
    `,
  ],
})
export class DashboardComponent {

  @ViewChild('transactionHistory') transactionHistory?: TransactionsHistoryComponent;

  constructor(private manageUser: ManageUserService) {}

  /**
   * This is a Callback from the Child 'MakeTransferComponent'.
   * Update the Transaction History Data, by adding a new transaction.
   * @param {*} data
   * @memberof DashboardComponent
   */
  updateTransactionHistory(data: any) {
    const transferData: Transfer = data;
    this.manageUser.updateUserBalance(transferData.amount);
    this.transactionHistory?.addNewTransaction(transferData);
  }
}
