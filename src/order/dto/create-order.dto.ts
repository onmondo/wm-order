/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Expose } from 'class-transformer';
import { IsDate, IsNumber, IsString, Length } from 'class-validator';

/**
 * This DTO should be use in DB
 */
export class CreateOrderDto {
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
  gross_amount: number;

  @Expose()
  @IsNumber()
  shares: number;

  @Expose()
  @IsNumber()
  gains?: number;

  @Expose()
  @IsDate()
  date: Date;

  // @Exclude()
  @IsString()
  remarks: string;
}
