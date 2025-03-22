/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Expose, Type } from 'class-transformer';
import { IsDate, IsNumber, IsString, Length } from 'class-validator';

export class CreateOrderRequestDto {
  @Expose()
  @IsString()
  @Length(1, 10)
  ticker: string;

  @Expose()
  @IsString()
  type: 'BUY' | 'SELL' | 'DIV';

  @IsNumber()
  currentPricePerShare?: number;

  @Expose()
  @IsNumber()
  amount: number;

  @Expose()
  @IsNumber()
  shares: number;

  @Expose()
  @IsNumber()
  gains?: number;

  @Expose()
  @Type(() => Date)
  @IsDate()
  date: Date;

  // @Exclude()
  @IsString()
  remarks: string;
}
