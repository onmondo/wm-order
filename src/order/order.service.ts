import { Injectable, Scope } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable({
  scope: Scope.DEFAULT,
})
export class OrderService {
  createOrder(createOrder: CreateOrderDto) {
    console.log('Create order', createOrder);
  }
}
