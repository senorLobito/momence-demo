import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { CurrencyRatesModule } from './currency-rates/currency-rates.module';

@Module({
  imports: [ConfigModule.forRoot(), CurrencyRatesModule],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
