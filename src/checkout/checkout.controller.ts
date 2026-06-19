import {
    Body,
    Controller,
    Post,
    Get,
    Param,
  } from '@nestjs/common';
  
  import { CheckoutService } from './checkout.service';
  
  import { CheckoutDto } from './dto/checkout.dto';
  
  @Controller('checkout')
  export class CheckoutController {
  
    constructor(
      private readonly checkoutService:
        CheckoutService,
    ) {}
  
    @Post()
    checkout(
      @Body()
      dto: CheckoutDto,
    ) {
      return this.checkoutService.checkout(
        dto,
      );
    }

    @Get(':id')
    getOrder(
    @Param('id') id: string,
    ) {
    return this.checkoutService.getOrder(
    id,
  );
}
  }