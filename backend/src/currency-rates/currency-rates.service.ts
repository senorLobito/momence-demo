import { Injectable } from '@nestjs/common';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { HttpService } from '@nestjs/axios';
import configuration from '../config/configuration';
import { CurrencyRatesTextParser } from './currency-rates.text.parser';
import { CurrencyRateList } from './types/CurrencyRateList';

@Injectable()
export class CurrencyRatesService {
  constructor(
    private readonly httpService: HttpService,
    private readonly currencyRatesParser: CurrencyRatesTextParser,
  ) {}

  async fetchCurrencyRateList(): Promise<CurrencyRateList> {
    return this.currencyRatesParser
      .init(
        (
          await firstValueFrom(
            this.httpService.get(configuration().exchangeRatesUrl).pipe(
              catchError((error: AxiosError) => {
                throw `An error while fetching exchange rates occured: ${error.message}`;
              }),
            ),
          )
        ).data,
      )
      .parseRateDate()
      .parseSequence()
      .parseHeaders()
      .parseRates()
      .getParsedList();
  }
}
