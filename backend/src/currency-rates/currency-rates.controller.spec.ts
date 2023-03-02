import { Test, TestingModule } from "@nestjs/testing";
import { CurrencyRatesController } from "./currency-rates.controller";

describe("CurrencyRatesController", () => {
  let controller: CurrencyRatesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CurrencyRatesController],
    }).compile();

    controller = module.get<CurrencyRatesController>(CurrencyRatesController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
