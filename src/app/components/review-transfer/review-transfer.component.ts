import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Transfer } from 'src/app/models/transfer.model';

@Component({
  selector: 'app-review-transfer',
  template: `
    <ng-template #reviewTransferModal let-modal>
      <div class="modal-header">
        <h4 class="modal-title"><b>Review</b> Transfer</h4>
        <button
          type="button"
          class="close"
          aria-label="Close"
          (click)="modal.dismiss('Cross click')"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div class="fst-italic">Are you ready to send out this transfer?</div><br/>
        <div class="fw-bold">It will be sent to account:</div>
        <div>{{ transferData?.toAccount }}</div><br/>
        <div class="fw-bold">With the amount of:</div>
        <div>{{ currency + transferData?.amount }}</div>
      </div>
      <div class="modal-footer">
        <button data-test="cancelButton" type="button" class="btn btn-light" (click)="cancel()">
          Close
        </button>
        <button data-test="submitButton" type="button" class="btn btn-primary" (click)="submit()">
          Send Transfer
        </button>
      </div>
    </ng-template>
  `,
  styles: [
    `
      @import 'src/app/styles/vars';
      :host {
        .modal .modal-content {
          .modal-body {
          }
          .modal-footer {
          }
        }
        .modal-dialog {
        }
      }
    `,
  ],
})
export class ReviewTransferComponent {
  transferData!: Transfer;
  currency: string = 'EUR';
  @ViewChild('reviewTransferModal') reviewTransferModal?: TemplateRef<any>;

  @Output() submitReview: EventEmitter<any> = new EventEmitter();

  constructor(private modalService: NgbModal) {}

  /* Modal Actions <-- */
  openModal(data: Transfer) {
    this.transferData = data;
    if (this.transferData.currency === 'EUR') {
      this.currency = '€';
    }
    this.modalService.open(this.reviewTransferModal, { centered: true });
  }
  cancel() {
    this.modalService.dismissAll();
  }
  submit() {
    this.submitReview?.emit(this.transferData);
    this.modalService.dismissAll();
  }
  /* Modal Actions --> */
}
