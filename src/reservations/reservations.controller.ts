import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Delete,
  } from '@nestjs/common';

  import {
    ApiBody,
    ApiOperation,
    ApiResponse,
    ApiTags,
  } from '@nestjs/swagger';
  
  import { ReservationsService } from './reservations.service';
  
  import { CreateReservationDto } from './dto/create-reservation.dto';
  
  @ApiTags('Reservations')
  @Controller('reservations')
  export class ReservationsController {
  
    constructor(
      private readonly reservationService:
        ReservationsService,
    ) {}
  
    @Post()
    @ApiOperation({
      summary:
        'Reserve a product',
    })
    @ApiBody({
      type:
        CreateReservationDto,
    })
    @ApiResponse({
      status: 201,
      description:
        'Reservation created successfully',
    })
    create(
      @Body()
      dto: CreateReservationDto,
    ) {
      return this.reservationService.create(
        dto,
      );
    }
  
    @Get(':id')
    @ApiOperation({
      summary:
        'Get reservation details',
    })
    findOne(
      @Param('id') id: string,
    ) {
      return this.reservationService.findOne(id);
    }

    @Delete(':id')
    @ApiOperation({
      summary:
        'Cancel reservation',
    })
    cancel(
      @Param('id') id: string,
    ) {
      return this.reservationService.cancel(
        id,
      );
    }
}