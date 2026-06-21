import {
    BadRequestException,
    Injectable,
    NotFoundException,
  } from '@nestjs/common';
  
  import { PrismaService } from '../prisma/prisma.service';
  
  import { CheckoutDto } from './dto/checkout.dto';
  import { OrderStatus } from '@prisma/client';

  @Injectable()
  export class CheckoutService {
  
    constructor(
      private readonly prisma: PrismaService,
    ) {}
  
    async checkout(dto: CheckoutDto) {
  
      return this.prisma.$transaction(
        async (tx) => {
  
          const reservation =
            await tx.reservation.findUnique({
              where: {
                id: dto.reservationId,
              },
              include: {
                product: true,
                order: true,
              },
            });
  
          if (!reservation) {
            throw new NotFoundException(
              'Reservation not found',
            );
          }
  
          if (
            reservation.status !== 'ACTIVE'
          ) {
            throw new BadRequestException(
              'Reservation is not active',
            );
          }
  
          if (
            reservation.expiresAt <
            new Date()
          ) {
            throw new BadRequestException(
              'Reservation expired',
            );
          }
  
          if (reservation.order) {
            throw new BadRequestException(
              'Order already exists',
            );
          }
  
          const amount =
            Number(
              reservation.product.price,
            ) * reservation.quantity;
  
            const order =
            await tx.order.create({
              data: {
                reservationId:
                  reservation.id,
                amount,
                status: OrderStatus.PAID,
              },
            });
  
          await tx.reservation.update({
            where: {
              id: reservation.id,
            },
            data: {
              status: 'COMPLETED',
            },
          });
  
          return order;
        },
      );
    }

    async getOrder(id: string) {
        return this.prisma.order.findUnique({
          where: { id },
          include: {
            reservation: {
              include: {
                product: true,
              },
            },
          },
        });
      }
  }