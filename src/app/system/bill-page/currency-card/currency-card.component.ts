import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-currency-card',
  templateUrl: './currency-card.component.html',
  styleUrls: ['./currency-card.component.css']
})
export class CurrencyCardComponent implements OnInit {
  @Input() currencyIls: any;
  @Input() currencyEur: any;
  usd: number;
  eur: number;

  ngOnInit() {
    this.usd  = 1/this.currencyIls.valueOf().USD_ILS;
    this.eur  = this.usd*this.currencyEur.valueOf().USD_EUR;
  }

}
