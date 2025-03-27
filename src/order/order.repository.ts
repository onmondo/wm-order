import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { SupabaseService } from 'src/shared';
import { GetOrderDto } from './dto';
import {
  SortOption,
  FilterOption,
  // PaginationOption
} from './interface';

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
    filterOption: FilterOption,
    sortOption: SortOption,
    // paginationOption: PaginationOption,
  ): Promise<GetOrderDto[]> {
    // const from = (paginationOption?.page - 1) * paginationOption?.limit;
    // const to = from + paginationOption?.limit;

    const orderDbTable = this.supabase.getClient().from('orders');
    const { data, error } = await orderDbTable
      .select(
        'ticker, transaction_type, price, shares, gross_amount, gains, date',
      )
      .eq(filterOption.columnName, filterOption.value)
      // .range(from, to)
      .order(sortOption.columnName, { ascending: sortOption.ascending });

    if (error) throw error;

    return data;
  }
}
