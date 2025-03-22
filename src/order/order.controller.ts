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
import { CreateOrderDto, CreateOrderRequestDto } from './dto';
import { plainToInstance } from 'class-transformer';
import { LoggerService } from 'src/shared/logger-service/logger-service';

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
  createOrder(@Body() request: CreateOrderRequestDto): { message: string } {
    console.log('request', request);
    this.logger.log();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    const newOrder = plainToInstance(CreateOrderDto, request);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    this.order.createOrder(newOrder);
    return {
      message: 'success',
    };
  }
}
