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
    const { ticker, gains, date, remarks } = createOrder;
    const transactions = createOrder.actions.map((action) => {
      const { type, currentPricePerShare, shares } = action;
      if (currentPricePerShare && shares) {
        const grossAmount = currentPricePerShare * shares;
        const orderToPersist = {
          ticker,
          type,
          currentPricePerShare,
          gross_amount: grossAmount,
          shares,
          gains,
          date,
          remarks,
        };
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        const newOrder = plainToInstance(
          CreateOrderDto,
          orderToPersist,
        ) as CreateOrderDto;

        return this.repository.createOrder(newOrder);
      }
    });

    await Promise.all(transactions);
  }
}
