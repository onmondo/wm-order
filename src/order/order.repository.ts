import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { SupabaseService } from 'src/shared';
import { FetchOrderRequestDto, GetOrderDto } from './dto';
// import { SortOption, FilterOption, PaginationOption } from './interface';

@Injectable()
export class OrderRepository {
  constructor(private readonly supabase: SupabaseService) {}

  async createOrder(newOrder: CreateOrderDto) {
    const orderDbTable = this.supabase.getClient().from('orders');

    const { data, error } = await orderDbTable.insert([newOrder]);

    if (error) throw error;

    return data;
  }

  async fetchOrders(): Promise<GetOrderDto[]> {
    const orderDbTable = this.supabase.getClient().from('orders');
    const { data, error } = await orderDbTable.select(
      'ticker, transaction_type, price, shares, gross_amount, gains, date',
    );

    if (error) throw error;

    return data;
  }

  async fetchOrdersSortedByDate(ascending: boolean): Promise<GetOrderDto[]> {
    const orderDbTable = this.supabase.getClient().from('orders');
    const { data, error } = await orderDbTable
      .select(
        'ticker, transaction_type, price, shares, gross_amount, gains, date',
      )
      .order('date', { ascending });

    if (error) throw error;

    return data;
  }

  async fetchOrdersFilterByColumn(
    fetchOrderRequestDto: FetchOrderRequestDto,
  ): Promise<GetOrderDto[]> {
    const from = fetchOrderRequestDto
      ? (fetchOrderRequestDto?.page - 1) * fetchOrderRequestDto?.limit
      : 0;
    const to = from + fetchOrderRequestDto?.limit - 1;

    const orderDbTable = this.supabase.getClient().from('orders');
    const { data, error } = await orderDbTable
      .select(
        'ticker, transaction_type, price, shares, gross_amount, gains, date',
      )
      .eq(fetchOrderRequestDto.columnName, fetchOrderRequestDto.value)
      .order('date', { ascending: false })
      .range(from, to);
    // .order(sortOption.columnName, { ascending: sortOption.ascending });

    if (error) throw error;

    return data;
  }
}
