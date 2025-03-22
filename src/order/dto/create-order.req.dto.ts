/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Expose, Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
} from 'class-validator';
import { OrderActionRequest } from './order-action.req.dto';

export class CreateOrderRequestDto {
  @Expose()
  @IsString()
  @Length(1, 10)
  ticker: string;

  @IsArray()
  @IsNotEmpty()
  actions: Array<OrderActionRequest>;

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
