import { Injectable } from '@nestjs/common';
import { Currency, CurrencyRate } from './types/CurrencyRate';
import { CurrencyRateList } from './types/CurrencyRateList';
import ICurrencyRateParser from './interfaces/ICurrencyRateParser';

const DATE_AND_SEQUENCE_INDEX = 0;
const HEADERS_INDEX = 1;
const DATA_INDEX = 2;

const COUNTRY_INDEX = 0;
const CURRENCY_INDEX = 1;
const AMOUNT_INDEX = 2;
const CODE_INDEX = 3;
const RATE_INDEX = 4;

@Injectable()
export class CurrencyRatesTextParser implements ICurrencyRateParser {
  private _inputLines: string[];
  private _rateDate: Date;
  private _sequenceNumber: string;
  private _headers: string[] = [];
  private _currencyRates: CurrencyRate[] = [];

  init(inputString: string): this {
    this.currencyRates = [];
    this.headers = [];
    this.inputLines = inputString.split(/\r?\n/).filter((el) => el);
    return this;
  }

  parseRateDate(): this {
    const regex = new RegExp(/\d{2}\s[a-zA-Z]{3}\s\d{4}/g);
    this.rateDate = new Date(
      this.inputLines[DATE_AND_SEQUENCE_INDEX].match(regex)[0].trim(),
    );
    return this;
  }

  parseSequence(): this {
    const regex = new RegExp(/#\d[^/]*$/g);
    this.sequenceNumber =
      this.inputLines[DATE_AND_SEQUENCE_INDEX].match(regex)[0].trim();
    return this;
  }

  parseHeaders(): this {
    this.headers = this.inputLines[HEADERS_INDEX].match(
      new RegExp(/(([a-zA-Z0-9.\s])+(?=\|))?([a-zA-Z\d.\s])+/g),
    );
    return this;
  }

  parseRates(): this {
    for (const line of this.inputLines.slice(DATA_INDEX)) {
      this.currencyRates = [...this.currencyRates, this.parseCurrency(line)];
    }
    return this;
  }

  getParsedList(): CurrencyRateList {
    return {
      listDate: this.rateDate,
      headers: this.headers,
      currencyRates: this.currencyRates,
    };
  }

  private parseCurrency(input: string): CurrencyRate {
    const matches = input.match(
      new RegExp(/(([a-zA-Z0-9.\s])+(?=\|))?([a-zA-Z\d.\s])+/g),
    );

    return {
      country: matches[COUNTRY_INDEX].trim(),
      currency: matches[CURRENCY_INDEX].trim(),
      amount: parseInt(matches[AMOUNT_INDEX].trim()),
      code: Currency[matches[CODE_INDEX].trim()],
      rate: parseFloat(matches[RATE_INDEX].trim()),
    };
  }

  get inputLines(): string[] {
    return this._inputLines;
  }

  set inputLines(value: string[]) {
    this._inputLines = value;
  }

  get headers(): string[] {
    return this._headers;
  }

  set headers(value: string[]) {
    this._headers = value;
  }

  get rateDate(): Date {
    return this._rateDate;
  }

  set rateDate(value: Date) {
    this._rateDate = value;
  }

  get sequenceNumber(): string {
    return this._sequenceNumber;
  }

  set sequenceNumber(value: string) {
    this._sequenceNumber = value;
  }

  get currencyRates(): CurrencyRate[] {
    return this._currencyRates;
  }

  set currencyRates(value: CurrencyRate[]) {
    this._currencyRates = value;
  }
}
