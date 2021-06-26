import { TestBed } from '@angular/core/testing';

import { ManageUserService } from './manage-user.service';

describe('ManageUserService', () => {
  let service: ManageUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should init user', () => {
    expect(service.getUser().name === 'My Personal Account').toBeTruthy();
  });
});
