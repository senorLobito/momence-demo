import { Controller, Get } from "@nestjs/common";
import { CurrencyRatesService } from "./currency-rates.service";
import { CurrencyRateListDto } from "./dto/CurrencyRateListDto";

@Controller("currency-rates")
export class CurrencyRatesController {
  constructor(private currencyRatesService: CurrencyRatesService) {}

  @Get("getRates")
  async getRates(): Promise<CurrencyRateListDto> {
    return CurrencyRateListDto.toResponse(
      await this.currencyRatesService.fetchCurrencyRateList(),
    );
  }
}
