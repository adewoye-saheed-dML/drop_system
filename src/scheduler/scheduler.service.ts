import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SchedulerService {

  private readonly logger =
    new Logger(SchedulerService.name);

  constructor(
    private readonly prisma: PrismaService,
  ) {}

  @Cron('* * * * *')
  async expireReservations() {

    const expiredReservations =
      await this.prisma.reservation.findMany({
        where: {
          status: 'ACTIVE',
          expiresAt: {
            lt: new Date(),
          },
        },
      });

    if (
      expiredReservations.length === 0
    ) {
      return;
    }

    this.logger.log(
      `Found ${expiredReservations.length} expired reservations`,
    );

    for (const reservation of expiredReservations) {

      await this.prisma.$transaction(
        async (tx) => {

          await tx.product.update({
            where: {
              id: reservation.productId,
            },
            data: {
              availableStock: {
                increment:
                  reservation.quantity,
              },
            },
          });

          await tx.reservation.update({
            where: {
              id: reservation.id,
            },
            data: {
              status: 'EXPIRED',
            },
          });
        },
      );
    }
  }
}