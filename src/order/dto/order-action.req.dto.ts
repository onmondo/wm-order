/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class OrderActionRequest {
  @Expose()
  @IsString()
  type: 'BUY' | 'SELL' | 'DIV';

  @IsNumber()
  @IsNotEmpty()
  currentPricePerShare?: number;

  @Expose()
  @IsNumber()
  @IsNotEmpty()
  shares: number;
}
