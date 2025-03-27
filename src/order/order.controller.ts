import {
  Body,
  Controller,
  Get,
  HttpCode,
  Injectable,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderRequestDto } from './dto';
import { LoggerService } from 'src/shared';
import { GetOrderResDto } from './dto/get-order.res.dto';

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
  async getOrders(): Promise<GetOrderResDto[]> {
    const response = await this.order.getOrders();
    return response;
  }

  @Get('/ticker/:ticker')
  async getOrdersByTicker(
    @Param('ticker') ticker: string,
    // @Param('page') page: number,
    // @Param('limit') limit: number,
  ): Promise<GetOrderResDto[]> {
    const response = await this.order.getOrdersByTicker(
      ticker,
      // {
      //   page,
      //   limit,
      // }
    );
    return response;
  }
}
