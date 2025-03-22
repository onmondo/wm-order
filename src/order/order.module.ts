import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { SharedModule } from 'src/shared/shared.module';
import { OrderRepository } from './order.repository';

@Module({
  imports: [SharedModule],
  controllers: [OrderController],
  providers: [OrderService, OrderRepository],
})
export class OrderModule {}
