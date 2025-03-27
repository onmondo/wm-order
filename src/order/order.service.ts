import { Injectable, Scope } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { plainToInstance } from 'class-transformer';
import { CreateOrderRequestDto, GetOrderDto } from './dto';
import { OrderRepository } from './order.repository';
import { GetOrderResDto } from './dto/get-order.res.dto';
// import { PaginationOption } from './interface';

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

        const newOrder = plainToInstance(CreateOrderDto, orderToPersist);

        return this.repository.createOrder(newOrder);
      }
    });

    await Promise.all(transactions);
  }

  async getOrders(): Promise<GetOrderResDto[]> {
    const orders: GetOrderDto[] =
      await this.repository.fetchOrdersSortedByDate(false);

    const response = plainToInstance(GetOrderResDto, orders);
    return response;
  }

  async getOrdersByTicker(
    ticker: string,
    // paginationOption: PaginationOption,
  ): Promise<GetOrderResDto[]> {
    const orders: GetOrderDto[] =
      await this.repository.fetchOrdersFilterByColumn(
        { columnName: 'ticker', value: ticker },
        { columnName: 'date', ascending: false },
        // paginationOption,
      );

    const response = plainToInstance(GetOrderResDto, orders);
    return response;
  }
}
