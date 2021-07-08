import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { Transfer } from 'src/app/models/transfer.model';
import { ManageUserService } from 'src/app/services/manage-user/manage-user.service';
import * as CustomValidators from 'src/app/util/custom-validator';
import { ReviewTransferComponent } from '../review-transfer/review-transfer.component';
import * as Constants from 'src/app/util/constants';

@Component({
  selector: 'app-make-transfer',
  template: `
    <div class="mt-container">
      <div class="mt-header p-2 px-4 w-100">
        <span class="mdi mdi-bank-transfer"></span>
        <span><b>Make </b>Transfer</span>
      </div>
      <div class="mt-content p-2 px-4 w-100">
        <form [formGroup]="moneyTransfer">
          <div class="mb-3">
            <label for="fromAccount" class="form-label">From Account</label>
            <input
              type="text"
              class="form-control"
              id="fromAccount"
              formControlName="fromAccount"
              placeholder="From Account"
              area-label="From Account"
            />
          </div>
          <div class="mb-3">
            <label for="toAccount" class="form-label">To Account</label>
            <input
              type="text"
              class="form-control"
              id="toAccount"
              name="toAccount"
              formControlName="toAccount"
              placeholder="To Account"
              area-label="To Account"
              [ngClass]="{
                'is-invalid':
                  moneyTransfer.get('toAccount')?.invalid &&
                  (moneyTransfer.get('toAccount')?.dirty ||
                    moneyTransfer.get('toAccount')?.touched)
              }"
            />
            <div class="invalid-feedback">Please enter account details</div>
          </div>
          <div class="mb-3">
            <label for="amount" class="form-label">Amount</label>
            <div class="input-group mb-3">
              <span class="input-group-text">{{
                currency === 'EUR' ? '€' : currency
              }}</span>
              <input
                type="number"
                class="form-control"
                id="amount"
                name="amount"
                formControlName="amount"
                placeholder="Amount"
                area-label="Amount"
                [ngClass]="{
                  'is-invalid':
                    moneyTransfer.get('amount')?.invalid &&
                    (moneyTransfer.get('amount')?.dirty ||
                      moneyTransfer.get('amount')?.touched) ||
                      totalBalance < 500
                }"
              />
              <div *ngIf="moneyTransfer.controls.amount.errors?.invalidAmount" class="invalid-feedback">
                Please enter amount to transfer
              </div>
              <div *ngIf="moneyTransfer.controls.amount.errors?.invalidThreshold" class="invalid-feedback">
                There is not enough balance (min 500 threshhold required)
              </div>
            </div>
          </div>
        </form>
        <div class="footer">
          <app-submit-button
            (submitForm)="onSubmit($event)"
          ></app-submit-button>
        </div>
      </div>
    </div>
    <app-review-transfer
      #reviewTransfer
      (submitReview)="onSubmitAfterReview($event)"
    ></app-review-transfer>
  `,
  styles: [
    `
      @import 'src/app/styles/vars';
      :host {
        width: 100%;
        .mt-container {
          .mt-header {
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
          .mt-content {
            .footer {
              display: flex;
              justify-content: flex-end;
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
export class MakeTransferComponent implements OnInit, OnDestroy {
  moneyTransfer!: FormGroup;
  currency?: string;
  totalBalance!: number;
  subscriptions: Subscription;

  @Output() updateAfterSubmit: EventEmitter<any> = new EventEmitter();

  @ViewChild('reviewTransfer') reviewTransfer!: ReviewTransferComponent;
  
  constructor(
    private formBuilder: FormBuilder,
    private manageUser: ManageUserService
  ) {
    this.subscriptions = new Subscription();
  }

  /**
   * Initialize the user and account details on load.
   * Create a form having Account transfer details and provide validations.
   * @memberof MakeTransferComponent
   */
  ngOnInit(): void {
    const currentUser = this.manageUser.getUser();
    this.totalBalance = currentUser.balance;
    this.currency = currentUser.currency;
    const fromAcc =
      currentUser.name +
      ': ' +
      (currentUser.currency === 'EUR' ? '€' : currentUser.currency) +
      currentUser.balance;
    // Create a reactive form group to handle transfer details
    this.moneyTransfer = this.formBuilder.group({
      fromAccount: new FormControl({ disabled: true, value: fromAcc }, null),
      toAccount: new FormControl('', Validators.required),
      amount: new FormControl('', [
        Validators.required,
        Validators.min(0),
        CustomValidators.validateAmount(),
      ]),
    });
    this.subscribeToBalanceUpdate();
  }
  
  /**
   * Subscribe to an Observable which handles the change in account balance.
   * @memberof MakeTransferComponent
   */
  subscribeToBalanceUpdate() {
    this.subscriptions.add(
      this.manageUser.balanceObservable.subscribe((balance: number) => {
        if (!balance) {
          return;
        }
        this.totalBalance = Number(balance.toFixed(2));
        const currentUser = this.manageUser.getUser();
        this.currency = currentUser.currency;
        const fromAcc =
          currentUser.name +
          ': ' +
          (currentUser.currency === 'EUR' ? '€' : currentUser.currency) +
          this.totalBalance;
        this.moneyTransfer.get('fromAccount')?.setValue(fromAcc);
      })
    );
  }

  onSubmit(event: any) {
    const enteredAmount = this.moneyTransfer.get("amount")?.value;
    if ((enteredAmount + Constants.thresholdAmount) > this.totalBalance) {
      this.moneyTransfer.get("amount")?.setErrors({ invalidThreshold: true });
    }
    this.moneyTransfer.markAllAsTouched();
    if (!this.moneyTransfer.valid) {
      return;
    }
    const currentUser = this.manageUser.getUser();
    // Open modal to review the transfer
    const transferData: Transfer = {
      fromAccount: this.moneyTransfer.get('fromAccount')?.value,
      toAccount: this.moneyTransfer.get('toAccount')?.value,
      amount: this.moneyTransfer.get('amount')?.value,
      currency: currentUser.currency,
    };
    this.reviewTransfer?.openModal(transferData);
  }
  /**
   * This is a callback from the 'ReviewTransferComponent' asking to process the transcation.
   * @param {Transfer} transferData
   * @memberof MakeTransferComponent
   */
  onSubmitAfterReview(transferData: Transfer) {
    this.reset(); // Reset to-account and amount 
    this.updateAfterSubmit?.emit(transferData);
  }

  reset() {
    this.moneyTransfer.controls.toAccount.reset();
    this.moneyTransfer.controls.amount.reset();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
