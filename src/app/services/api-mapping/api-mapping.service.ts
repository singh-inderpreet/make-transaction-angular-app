import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiMappingService {

  constructor(private http: HttpClient) { }

  /**
   * Service to fetch the Transactions data
   * @return {*} Observable
   * @memberof ApiMappingService
   */
  getTransacations() {
    const transactionsHistoryURL = 'https://cors-anywhere.herokuapp.com/https://r9vdzv10vd.execute-api.eu-central-1.amazonaws.com/dev/transactions';
    return this.http.get(transactionsHistoryURL)
  }
}
