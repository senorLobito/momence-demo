import { CurrencyRateList } from '../types/CurrencyRateList';
import { CurrencyRateDto } from './CurrencyRateDto';
import * as dayjs from 'dayjs';
export class CurrencyRateListDto {
  listDate: string;
  headers: string[];
  currencyRates: CurrencyRateDto[];

  static toResponse(entity: CurrencyRateList): CurrencyRateListDto {
    return {
      listDate: dayjs(entity.listDate).format('DD.MM.YYYY'),
      headers: entity.headers,
      currencyRates: entity.currencyRates.map((rate) =>
        CurrencyRateDto.toResponse(rate),
      ),
    };
  }
}
