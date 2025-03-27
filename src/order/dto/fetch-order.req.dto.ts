import { Optional } from '@nestjs/common';
import { Expose } from 'class-transformer';

export class FetchOrderRequestDto {
  @Expose()
  @Optional()
  columnName: string;

  @Expose()
  @Optional()
  value: string;

  @Expose()
  @Optional()
  page: number;

  @Expose()
  @Optional()
  limit: number;
}
