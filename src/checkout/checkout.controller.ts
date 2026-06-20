import {
    Body,
    Controller,
    Post,
    Get,
    Param,
  } from '@nestjs/common';
  
  import {
    ApiBody,
    ApiOperation,
    ApiResponse,
    ApiTags,
  } from '@nestjs/swagger';

  import { CheckoutService } from './checkout.service';
  
  import { CheckoutDto } from './dto/checkout.dto';
  
  @ApiTags('Checkout')
  @Controller('checkout')
  export class CheckoutController {
  
    constructor(
      private readonly checkoutService:
        CheckoutService,
    ) {}
  
    @Post()
    @ApiOperation({
      summary:
        'Complete checkout',
    })
    @ApiBody({
      type: CheckoutDto,
    })
    @ApiResponse({
      status: 201,
      description:
        'Checkout successful',
    })
    checkout(
      @Body()
      dto: CheckoutDto,
    ) {
      return this.checkoutService.checkout(
        dto,
      );
    }

    @Get(':id')
    @ApiOperation({
      summary:
        'Get order details',
    })
    getOrder(
      @Param('id') id: string,
    ) {
      return this.checkoutService.getOrder(
        id,
      );
    }
  }