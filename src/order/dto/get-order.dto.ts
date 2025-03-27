/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Expose } from 'class-transformer';
import { IsDate, IsNumber, IsString, Length } from 'class-validator';

/**
 * This DTO should be use in DB
 */
export class GetOrderDto {
  @Expose()
  @IsString()
  @Length(1, 10)
  ticker: string;

  @Expose({ name: 'type' })
  @IsString()
  transaction_type: 'BUY' | 'SELL' | 'DIV';

  @Expose({ name: 'currentPricePerShare' })
  @IsNumber()
  price?: number;

  @Expose()
  @IsNumber()
  shares: number;

  @Expose({ name: 'grossAmount' })
  gross_amount: number;

  @Expose()
  gains: number;

  @Expose()
  @IsDate()
  date: Date;
}
