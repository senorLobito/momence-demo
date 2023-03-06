import { CurrencyRatesController } from "./currency-rates.controller";
import { CurrencyRatesService } from "./currency-rates.service";
import { CurrencyRatesTextParser } from "./currency-rates.text.parser";
import { HttpModule } from "@nestjs/axios";
import { CurrencyRateList } from "./types/CurrencyRateList";
import { Currency } from "./types/CurrencyRate";
import { CurrencyRateListDto } from "./dto/CurrencyRateListDto";
import { Test, TestingModule } from "@nestjs/testing";
import { ConfigModule } from "@nestjs/config";
import configuration from "../config/configuration";

describe("CurrencyRatesController", () => {
  let controller: CurrencyRatesController;
  let service: CurrencyRatesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          load: [configuration],
        }),
        HttpModule,
      ],
      controllers: [CurrencyRatesController],
      providers: [CurrencyRatesService, CurrencyRatesTextParser],
    }).compile();

    controller = module.get<CurrencyRatesController>(CurrencyRatesController);
    service = module.get<CurrencyRatesService>(CurrencyRatesService);
  });

  describe("getRates", () => {
    it("should return DTO list of rates from CNB", async () => {
      const result: CurrencyRateList = {
        listDate: new Date(Date.parse("2022-02-02")),
        headers: ["Country", "Currency", "Amount", "Code", "Rate"],
        currencyRates: [
          {
            country: "EMU",
            currency: "euro",
            amount: 1,
            code: Currency.EUR,
            rate: 23.42,
          },
          {
            country: "USA",
            currency: "dollar",
            amount: 1,
            code: Currency.USD,
            rate: 22.148,
          },
        ],
      };

      jest
        .spyOn(service, "fetchCurrencyRateList")
        .mockImplementation(async () => result);

      expect(await controller.getRates()).toStrictEqual(
        CurrencyRateListDto.toResponse(result),
      );
    });
  });
});
