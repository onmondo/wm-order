import {
  Body,
  Controller,
  Get,
  HttpCode,
  Injectable,
  Param,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderRequestDto } from './dto';
import { LoggerService } from 'src/shared';
import { GetOrderResDto } from './dto/get-order.res.dto';
import { FetchOrderRequestDto } from './dto/fetch-order.req.dto';

@Controller('order')
@Injectable()
export class OrderController {
  constructor(
    private readonly order: OrderService,
    private readonly logger: LoggerService, // Please use the logger service of Nest JS
  ) {}

  @Post()
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      // forbidNonWhitelisted: false
    }),
  )
  @HttpCode(201)
  async createOrder(
    @Body() request: CreateOrderRequestDto,
  ): Promise<{ message: string }> {
    this.logger.log();
    await this.order.createOrder(request);

    return {
      message: 'success',
    };
  }

  @Get()
  async getOrders(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ): Promise<GetOrderResDto[]> {
    const fetchOrderRequest: FetchOrderRequestDto = {
      page: page || 1,
      limit: limit || 10,
      columnName: '',
      value: '',
    };
    const response = await this.order.getOrdersByTicker(fetchOrderRequest);
    return response;
  }

  @Get('/ticker/:ticker')
  async getOrdersByTicker(
    @Param('ticker') ticker?: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ): Promise<GetOrderResDto[]> {
    const fetchOrderRequest: FetchOrderRequestDto = {
      columnName: 'ticker',
      value: ticker || '',
      page: page || 1,
      limit: limit || 10,
    };
    const response = await this.order.getOrdersByTicker(fetchOrderRequest);
    return response;
  }
}
