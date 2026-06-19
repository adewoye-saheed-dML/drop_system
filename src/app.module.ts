import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ProductsModule } from './products/products.module';
import { ReservationsModule } from './reservations/reservations.module';
import { CheckoutModule } from './checkout/checkout.module';
import { ScheduleModule } from '@nestjs/schedule';
import { SchedulerModule } from './scheduler/scheduler.module';

@Module({
  imports: [ ScheduleModule.forRoot(),PrismaModule, ProductsModule, ReservationsModule, CheckoutModule, SchedulerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
