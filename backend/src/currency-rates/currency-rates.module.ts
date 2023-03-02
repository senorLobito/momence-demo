import { Module } from "@nestjs/common";
import { CurrencyRatesController } from "./currency-rates.controller";
import { CurrencyRatesService } from "./currency-rates.service";
import { HttpModule } from "@nestjs/axios";
import { ConfigModule } from "@nestjs/config";
import configuration from "../config/configuration";
import { CurrencyRatesTextParser } from "./currency-rates.text.parser";

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    HttpModule,
  ],
  controllers: [CurrencyRatesController],
  providers: [CurrencyRatesService, CurrencyRatesTextParser],
})
export class CurrencyRatesModule {}
