import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { CurrencyRatesModule } from "./currency-rates/currency-rates.module";

@Module({
  imports: [ConfigModule.forRoot(), CurrencyRatesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
