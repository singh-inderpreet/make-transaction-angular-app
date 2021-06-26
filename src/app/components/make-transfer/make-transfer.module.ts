import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MakeTransferComponent } from './make-transfer.component';
import { ReviewTransferComponent } from '../review-transfer/review-transfer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SubmitButtonComponent } from '../submit-button/submit-button.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [MakeTransferComponent, ReviewTransferComponent, SubmitButtonComponent],
  imports: [
    BrowserModule,
    CommonModule,
    NgbModule,
    ReactiveFormsModule,
  ],
  exports: [MakeTransferComponent]
})
export class MakeTransferModule { }
