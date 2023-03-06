import * as request from "supertest";
import { Test } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import { Currency } from "../src/currency-rates/types/CurrencyRate";
import { CurrencyRatesService } from "../src/currency-rates/currency-rates.service";
import { ConfigModule } from "@nestjs/config";
import configuration from "../src/config/configuration";
import { HttpModule, HttpService } from "@nestjs/axios";
import { CurrencyRatesController } from "../src/currency-rates/currency-rates.controller";
import { CurrencyRatesTextParser } from "../src/currency-rates/currency-rates.text.parser";
import { of } from "rxjs";
import { CurrencyRateListDto } from "../src/currency-rates/dto/CurrencyRateListDto";

/**
 * Usually input and expected data go somewhere to external file from where test can fetch them.
 */
const inputData = {
  data:
    "03 Mar 2023 #45\n" +
    "Country|Currency|Amount|Code|Rate\n" +
    "Australia|dollar|1|AUD|14.948\n" +
    "Brazil|real|1|BRL|4.256\n" +
    "EMU|euro|1|EUR|23.545\n" +
    "Hongkong|dollar|1|HKD|2.817\n" +
    "Hungary|forint|100|HUF|6.244\n",
};
const expectedResult: CurrencyRateListDto = {
  listDate: "03.03.2023",
  headers: ["Country", "Currency", "Amount", "Code", "Rate"],
  currencyRates: [
    {
      country: "Australia",
      currency: "dollar",
      amount: 1,
      code: Currency.AUD,
      rate: 14.948,
    },
    {
      country: "Brazil",
      currency: "real",
      amount: 1,
      code: Currency.BRL,
      rate: 4.256,
    },
    {
      country: "EMU",
      currency: "euro",
      amount: 1,
      code: Currency.EUR,
      rate: 23.545,
    },
    {
      country: "Hongkong",
      currency: "dollar",
      amount: 1,
      code: Currency.HKD,
      rate: 2.817,
    },
    {
      country: "Hungary",
      currency: "forint",
      amount: 100,
      code: Currency.HUF,
      rate: 6.244,
    },

  ],
};

describe("CurrencyRates E2E", () => {
  let app: INestApplication;
  const httpService = { get: jest.fn(() => of(inputData)) };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          load: [configuration],
        }),
        HttpModule,
      ],
      controllers: [CurrencyRatesController],
      providers: [CurrencyRatesService, CurrencyRatesTextParser],
    })
      .overrideProvider(HttpService)
      .useValue(httpService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it("/GET getRates - fetches the rates, parses them and returns as DTO", () => {
    return request(app.getHttpServer())
      .get("/currency-rates/getRates")
      .expect(200)
      .expect(expectedResult);
  });

  afterAll(async () => {
    await app.close();
  });
});
