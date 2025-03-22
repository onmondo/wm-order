import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { SupabaseService } from 'src/shared';

@Injectable()
export class OrderRepository {
  constructor(private readonly supabase: SupabaseService) {}

  async createOrder(newOrder: CreateOrderDto) {
    const orderDbTable = this.supabase.getClient().from('orders');

    const { data, error } = await orderDbTable.insert([newOrder]);

    if (error) throw error;

    return data;
  }
}
