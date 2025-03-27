import { Expose } from 'class-transformer';
import { IsDate, IsNumber, IsString, Length } from 'class-validator';

export class GetOrderResDto {
  @Expose()
  @IsString()
  @Length(1, 10)
  ticker: string;

  @Expose({ name: 'transaction_type' })
  @IsString()
  type: 'BUY' | 'SELL' | 'DIV';

  @Expose({ name: 'price' })
  @IsNumber()
  currentPricePerShare?: number;

  @Expose()
  @IsNumber()
  shares: number;

  @Expose({ name: 'gross_amount' })
  grossAmount: number;

  @Expose()
  gains: number;

  @Expose()
  @IsDate()
  date: Date;
}
