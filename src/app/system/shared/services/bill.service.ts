import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";
import {Bill} from "../models/bill.model";
import {Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";

const COLLECTION = 'bills';

@Injectable({
  providedIn: 'root'
})
export class BillService {

  constructor(
    private fireStore: AngularFirestore,
    public http: HttpClient) { }

  private addUpdate(bill: Bill) {
    return this.fireStore.collection(COLLECTION)
      .doc(bill.email).set(bill);
  }

  getBill(email: string): Observable<Bill>{
    return this.fireStore.collection(COLLECTION).doc(email).get()
      .pipe(map(d => d.data() as Bill))
  }

  addUpdateBill(bill: Bill) {
    return of(this.addUpdate(bill));
  }

  // getCurrency(base: string = 'EUR'): Observable<any> {
  //   return this.http.get(`http://data.fixer.io/api/latest?access_key=71797c73862497b0d8cbae963b8442b4&symbols=USD,AUD,CAD,PLN,MXN&format=1`)
  //     // .pipe(map((response: Response) => response.json()));
  // }
  getCurrencyIls(): Observable<any> {
    return this.http.get(`https://free.currconv.com/api/v7/convert?q=USD_ILS&compact=ultra&apiKey=0335dd34a4c83c4cb2fb`)
     // .pipe(map((response: Response) => response.json()));
  }

  getCurrencyEur(): Observable<any> {
    return this.http.get(`https://free.currconv.com/api/v7/convert?q=USD_EUR&compact=ultra&apiKey=0335dd34a4c83c4cb2fb`)
    // .pipe(map((response: Response) => response.json()));
  }

}
