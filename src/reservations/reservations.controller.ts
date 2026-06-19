import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Delete,
  } from '@nestjs/common';
  
  import { ReservationsService } from './reservations.service';
  
  import { CreateReservationDto } from './dto/create-reservation.dto';
  
  @Controller('reservations')
  export class ReservationsController {
  
    constructor(
      private readonly reservationService:
        ReservationsService,
    ) {}
  
    @Post()
    create(
      @Body()
      dto: CreateReservationDto,
    ) {
      return this.reservationService.create(
        dto,
      );
    }
  
    @Get(':id')
    findOne(
      @Param('id')
      id: string,
    ) {
      return this.reservationService.findOne(
        id,
      );
    }

    @Delete(':id')
    cancel(
        @Param('id') id: string,
    ) {
        return this.reservationService.cancel(id);
}

}