import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ManageUserService {
  user!: User;
  balanceObservable: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  constructor() {
    this.initUser();
  }
  initUser() {
    const myInitDetails: User = {
      name: 'My Personal Account',
      account: '1311111111111129',
      balance: 5824.76,
      currency: 'EUR',
      color: '#2d2f31'
    };
    this.setUser(myInitDetails);
  }
  getUser() {
    return this.user;
  }
  setUser(data: User) {
    this.user = data;
  }
  getUserBalance() {
    return this.user.balance;
  }
  updateUserBalance(transferedAmount: number) {
    if (this.user.balance! < 0) {
      return;
    }
    this.user.balance = this.user.balance! - transferedAmount;
    this.balanceObservable.next(this.user.balance);
  }
}
