import {Component, Input, OnInit} from '@angular/core';
import {Bill} from '../../shared/models/bill.model';

@Component({
  selector: 'app-bill-card',
  templateUrl: './bill-card.component.html',
  styleUrls: ['./bill-card.component.css']
})
export class BillCardComponent implements OnInit {

  @Input() bill: Bill;
  @Input() currencyIls: any;
  @Input() currencyEur: any;

  usd: number;
  eur: number;

  constructor() { }

  ngOnInit() {
    // const  ratesIls  = this.currencyIls.valueOf();
    // const  ratesEur  = this.currencyEur.valueOf();
    // this.usd = this.bill.value/ratesIls.USD_ILS ;
    // this.eur = this.usd*ratesEur.USD_EUR;
  }

}
