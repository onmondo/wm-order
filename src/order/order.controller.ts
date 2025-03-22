import {
  Body,
  Controller,
  HttpCode,
  Injectable,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderRequestDto } from './dto';
import { LoggerService } from 'src/shared';

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
    console.log('request', request);
    this.logger.log();
    await this.order.createOrder(request);

    return {
      message: 'success',
    };
  }
}
