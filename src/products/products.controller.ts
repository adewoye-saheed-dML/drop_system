import {
    Controller,
    Get,
    Param
   } from '@nestjs/common';
   
   import { ProductsService } from './products.service';
   import {
    ApiOperation,
    ApiResponse,
    ApiTags,
  } from '@nestjs/swagger';

  @ApiTags('Products')
  @Controller('products')
  export class ProductsController {  
    constructor(
     private readonly productService: ProductsService
    ){}
   
    @Get()
    @ApiOperation({
      summary:
        'Get all products',
    })
    @ApiResponse({
      status: 200,
      description:
        'Products retrieved successfully',
    })
    findAll() {
      return this.productService.findAll();
    }

    @Get(':id')
@ApiOperation({
  summary:
    'Get product by ID',
})
findOne(
  @Param('id') id: string,
) {
  return this.productService.findOne(id);
}
   }