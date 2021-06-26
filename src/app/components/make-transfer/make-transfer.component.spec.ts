import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ManageUserService } from 'src/app/services/manage-user/manage-user.service';
import { ReviewTransferComponent } from '../review-transfer/review-transfer.component';

import { MakeTransferComponent } from './make-transfer.component';

export class MockNgbModalRef {
  componentInstance = {
      prompt: undefined,
      title: undefined
  };
  result: Promise<any> = new Promise((resolve, reject) => resolve(true));
}

describe('MakeTransferComponent', () => {
  let component: MakeTransferComponent;
  let fixture: ComponentFixture<MakeTransferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ MakeTransferComponent ],
      providers: [ManageUserService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MakeTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should pre-populate \'From account\' field', () => {
    let fromAccount = component.moneyTransfer.controls['fromAccount'];
    expect(fromAccount.value.length).toBeTruthy();
  });
  it('should disable \'From account\' field', () => {
    let fromAccount = component.moneyTransfer.controls['fromAccount'];
    expect(fromAccount.status === 'DISABLED').toBeTruthy();
  });
  it('should require \'To account\' field', () => {
    let toAccount = component.moneyTransfer.controls['toAccount'];
    toAccount.setValue('Backbase');
    expect(toAccount.valid).toBeTruthy();
  });
  it('should report error for \'Amount\' exceeding total balance (added threshold of 500)', () => {
    let amount = component.moneyTransfer.controls['amount'];
    // Balance = 5824
    amount.setValue(5824);
    component.onSubmit(new Event('change'));
    expect(amount.valid).toBeFalsy();
  });
  it('should report success for \'Amount\' within limit of total balance (added threshold of 500)', () => {
    let amount = component.moneyTransfer.controls['amount'];
    // Balance = 5824
    amount.setValue(5300);
    component.onSubmit(new Event('change'));
    expect(amount.valid).toBeTruthy();
  });
});
