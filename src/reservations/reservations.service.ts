import {
    BadRequestException,
    Injectable,
    NotFoundException,
  } from '@nestjs/common';
  
  import { PrismaService } from '../prisma/prisma.service';
  
  import { CreateReservationDto } from './dto/create-reservation.dto';
  
  import { addMinutes } from 'date-fns';
  
  @Injectable()
  export class ReservationsService {
  
    constructor(
      private readonly prisma: PrismaService,
    ) {}
  
    async create(
      dto: CreateReservationDto,
    ) {
  
      return this.prisma.$transaction(
        async (tx) => {
  
            const products = await tx.$queryRaw<any[]>`
            SELECT *
            FROM "Product"
            WHERE id = ${dto.productId}
            FOR UPDATE
          `;
          
          const product = products[0];
          
          if (!product) {
            throw new NotFoundException(
              'Product not found',
            );
          }
          
          if (
            product.availableStock <
            dto.quantity
          ) {
            throw new BadRequestException(
              'Insufficient inventory',
            );
          }
  
          await tx.product.update({
            where: {
              id: product.id,
            },
            data: {
              availableStock: {
                decrement:
                  dto.quantity,
              },
            },
          });
  
          const reservation =
            await tx.reservation.create({
              data: {
                productId:
                  dto.productId,
                quantity:
                  dto.quantity,
                status: 'ACTIVE',
                expiresAt:
                  addMinutes(
                    new Date(),
                    10,
                  ),
              },
            });
  
          return reservation;
        },
      );
    }
  
    async findOne(id: string) {
      return this.prisma.reservation.findUnique({
        where: { id },
        include: {
          product: true,
        },
      });
    }

    async cancel(id: string) {

        return this.prisma.$transaction(
          async (tx) => {
      
            const reservation =
              await tx.reservation.findUnique({
                where: { id },
              });
      
            if (!reservation) {
              throw new NotFoundException();
            }
      
            if (
              reservation.status !== 'ACTIVE'
            ) {
              throw new BadRequestException(
                'Reservation not active',
              );
            }
      
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
      
            return tx.reservation.update({
              where: { id },
              data: {
                status: 'EXPIRED',
              },
            });
          },
        );
      }
  }