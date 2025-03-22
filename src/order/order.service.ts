import { Injectable, Scope } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { plainToInstance } from 'class-transformer';
import { CreateOrderRequestDto } from './dto';
import { OrderRepository } from './order.repository';

@Injectable({
  scope: Scope.DEFAULT,
})
export class OrderService {
  constructor(private readonly repository: OrderRepository) {}
  async createOrder(createOrder: CreateOrderRequestDto) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const newOrder = plainToInstance(
      CreateOrderDto,
      createOrder,
    ) as CreateOrderDto;

    await this.repository.createOrder(newOrder);
  }
}
